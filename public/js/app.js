var strat = Vue.component('strat', {
    data: function () {
        return {
            input_nome: '',
            input_idade: 18,
            index: 0,
        }
    },
    watch: {
        input_nome: function (val) {
            app.config['nome'] = val;
        },
        input_idade: function (val) {
            app.config['idade'] = val;
        },
    },
    methods: {
        next: function () {
            if (this.input_nome.length < 8) {
                this.$toastr.error('O campo nome é inválido deve ter 8 caracteres!', '',
                    {
                        "positionClass": "toast-top-left",
                        "progressBar": true,
                        "closeButton": true,
                    }
                );
            } else if (this.input_idade.length < 0 || this.input_idade.length > 2) {
                this.$toastr.error('O campo idade é inválido', '',
                    {
                        "positionClass": "toast-top-left",
                        "progressBar": true,
                        "closeButton": true,
                    }
                );
            } else if (this.index < 1) {
                this.index++;
            } else if (this.index == 1) {
                this.$toastr.info('Boa sorte', '',
                    {
                        "positionClass": "toast-top-left",
                        "closeButton": true,
                    }
                );

                app.index++;
            }
        },
    },
    template: '#start',
});

var quiz = Vue.component('quiz', {
    created: function () {
        this.getQuiz();
    },
    data: function () {
        return {
            quiz_index: 1,
            quiz: '',
            quiz_a: '',
            quiz_b: '',
            quiz_c: '',
            quiz_d: '',
            quizs: [],
            load: false,
            result: [],
            btn_next: false,
        }
    },
    methods: {
        quizNext: function () {
            if ((this.quiz_index) < 26) {
                if (this.btn_next) {
                    this.load = false;
                    this.getQuiz();
                    this.btn_next = false;
                } else {
                    this.$toastr.error('Por favor selecione uma opção!', '',
                        {
                            "positionClass": "toast-top-left",
                            "closeButton": true,
                        }
                    );
                }

            } else {
                this.quiz_index = 25;
                this.load = false;
                //app.index = 2;

                var quiz_a = 0;
                var quiz_b = 0;
                var quiz_c = 0;
                var quiz_d = 0;

                for (var i = this.result.length; i >= 0; i--) {
                    if (this.result[i] == 0) {
                        quiz_a++;
                    } else if (this.result[i] == 1) {
                        quiz_b++;
                    } else if (this.result[i] == 2) {
                        quiz_c++;
                    } else if (this.result[i] == 3) {
                        quiz_d++;
                    }
                }

                quiz_a = quiz_a * 4;
                quiz_b = quiz_b * 4;
                quiz_c = quiz_c * 4;
                quiz_d = quiz_d * 4;

                // var user = new FormData();
                // user.append('nome', app.config['nome']);
                // user.append('idade', app.config['idade']);

                // user.append('i', quiz_a);
                // user.append('c', quiz_b);
                // user.append('o', quiz_c);
                // user.append('a', quiz_d);

                let form = document.createElement("form");
                let input_quiz_a = document.createElement("input");
                let input_quiz_b = document.createElement("input");
                let input_quiz_c = document.createElement("input");
                let input_quiz_d = document.createElement("input");
                let input_name   = document.createElement("input");
                let input_idade  = document.createElement("input");

                form.method = "POST";
                form.action = document.querySelector('link[rel="canonical"]').href + "/resultados";

                input_quiz_a.value = quiz_a;
                input_quiz_a.name = "quiz_i";
                form.appendChild(input_quiz_a);

                input_quiz_b.value = quiz_b;
                input_quiz_b.name = "quiz_c";
                form.appendChild(input_quiz_b);

                input_quiz_c.value = quiz_c;
                input_quiz_c.name = "quiz_o";
                form.appendChild(input_quiz_c);

                input_quiz_d.value = quiz_d;
                input_quiz_d.name = "quiz_a";
                form.appendChild(input_quiz_d);

                input_name.value = app.config['nome'];
                input_name.name = "name";
                form.appendChild(input_name);

                input_idade.value = app.config['idade'];
                input_idade.name = "idade";
                form.appendChild(input_idade);

                document.body.appendChild(form);

                form.submit();
            }
        },
        getQuiz: function () {
            var url = 'js/json/' + this.quiz_index + '.json';
            this.$http.get(url).then(response => {
                // success callback
                var data = JSON.parse(response.bodyText);

                this.quiz = data['question'];
                this.quiz_a = data['i'];
                this.quiz_b = data['c'];
                this.quiz_c = data['o'];
                this.quiz_d = data['a'];

                var dados = [];

                switch (this.quiz_index) {
                    case 1:
                        dados[0] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[1] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[2] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[3] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 2:
                        dados[3] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[1] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[2] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[0] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 3:
                        dados[0] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[3] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[1] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[2] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 4:
                        dados[0] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[2] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[1] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[3] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 5:
                        dados[1] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[2] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[3] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[0] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 6:
                        dados[2] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[0] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[3] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[1] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 7:
                        dados[0] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[1] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[2] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[3] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 8:
                        dados[0] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[3] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[1] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[2] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 9:
                        dados[3] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[1] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[2] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[0] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 10:
                        dados[3] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[1] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[2] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[0] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    /* 10..20 */
                    case 11:
                        dados[3] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[1] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[2] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[0] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 12:
                        dados[0] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[1] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[2] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[3] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 13:
                        dados[3] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[1] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[2] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[0] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 14:
                        dados[0] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[3] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[1] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[2] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 15:
                        dados[2] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[1] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[3] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[0] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 16:
                        dados[2] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[1] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[3] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[0] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 17:
                        dados[3] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[1] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[2] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[0] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 18:
                        dados[0] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[2] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[1] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[3] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 19:
                        dados[0] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[2] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[1] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[3] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 20:
                        dados[3] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[1] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[2] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[0] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    /* 20..25 */
                    case 21:
                        dados[2] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[0] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[1] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[3] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 22:
                        dados[3] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[1] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[2] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[0] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 23:
                        dados[3] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[2] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[1] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[0] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 24:
                        dados[1] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[3] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[0] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[2] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                    case 25:
                        dados[0] = { message: data['i'], valor: 'i', Vid: 0 };
                        dados[2] = { message: data['c'], valor: 'c', Vid: 1 };
                        dados[1] = { message: data['o'], valor: 'o', Vid: 2 };
                        dados[3] = { message: data['a'], valor: 'a', Vid: 3 };
                        break;
                }

                this.quizs = dados;
                this.quiz_index++;
                this.load = true;
            }, response => {
                // error callback
            });
        },
        btn: function (elen, index, valor) {
            this.btn_next = true;

            var lista = document.querySelectorAll('li.box');

            for (var i = 0; i < lista.length; i++) {
                $(lista[i]).removeClass("active").children("span").remove();
            }

            $(lista[index]).addClass("active").append("<span class='checkmark'>&#x2713;</span>");

            this.result[this.quiz_index - 1] = valor;
        },
    },
    template: '#quiz',
});

var app = new Vue({
    el: '#app',
    data: {
        index: 0,
        result: [],
        config: {
            'nome': '',
            'idade': 18,
        },
    },
    methods: {
    }
});
