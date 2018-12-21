var eventBus = new Vue();

var config1 = Vue.component('config-1', {
  created: function(){
    this.input_url = window.location.href.replace('install.php', '');
  },
  data: function () {
    return {
      input_url: '',
      input_tipo: 'json',
      input_admin: 'Admin',
      input_senha: '',
    }
  },
  watch: {
    input_url : function(val){
      app.config['servidor']['url'] = val;
    },
    input_tipo : function(val){
      app.config['servidor']['tipo'] = val;
    },
    input_admin : function(val){
      app.config['servidor']['admin'] = val;
    },
    input_senha : function(val){
      app.config['servidor']['senha'] = val;
    },
  },
  template: '#config1'
});

var config2 = Vue.component('config-2', {
  data: function () {
    return {
      input_host: 'localhost',
      input_dbname: '',
      input_user: 'root',
      input_senha: '',
    }
  },
  watch: {
    input_host : function(val){
      app.config['mysql']['host'] = val;
    },
    input_dbname : function(val){
      app.config['mysql']['dbname'] = val;
    },
    input_user : function(val){
      app.config['mysql']['user'] = val;
    },
    input_senha : function(val){
      app.config['mysql']['senha'] = val;
    },
  },
  template: '#config2'
});

var config3 = Vue.component('config-3', {
  template: '#config3'
});


var app = new Vue({
  el: '#app',
  data: {
    indexConfig: 1,
    config: {
      'servidor': { 
        'url': '', 
        'tipo': 'json', 
        'admin': 'admin', 
        'senha': 'admin' 
      },
      'mysql': {
        'host': 'localhost',
        'dbname': 'test',
        'user': 'root',
        'senha': '',
      },
    },
    error: false,
    error_log: 'O campo nome é obrigatorio',
    etapa: 'Próxima',
    db_debug: false,
    sucesso: false,
  },
  methods: {
    nextConfig: function(){
      // Etapa 1
      if(this.indexConfig == 1){
        if(this.config['servidor']['url'].length == 0){
          this.error = true;
          this.error_log = 'O campo url é obrigatorio!';
        }else if(this.config['servidor']['tipo'].length == 0){
          this.error = true;
          this.error_log = 'O campo tipo é obrigatorio!';
        }else if(this.config['servidor']['admin'].length == 0){
          this.error = true;
          this.error_log = 'O campo admin é obrigatorio!';
        }else if(this.config['servidor']['senha'].length == 0){
          this.error = true;
          this.error_log = 'O campo senha é obrigatorio!';
        }else {
          if(this.config['servidor']['tipo'] == 'json') return this.indexConfig = 3;
          else return this.indexConfig++;
        }
      }
      // Etapa 2
      else if(this.indexConfig == 2){
        if(this.config['mysql']['host'].length == 0){
          this.error = true;
          this.error_log = 'O campo host é obrigatorio!';
        }else if(this.config['mysql']['dbname'].length == 0){
          this.error = true;
          this.error_log = 'O campo dbname é obrigatorio!';
        }else if(this.config['mysql']['user'].length == 0){
          this.error = true;
          this.error_log = 'O campo usuário é obrigatorio!';
        }else if(!this.db_debug){
          this.etapa = 'Verificar';
          this.testDB();
          if(this.error_log == 'Conexão com o banco de dados realizada com sucesso!'){
            this.db_debug = true;
            this.etapa = 'Finalizar';
          }
        }
        else {
          this.error = false;
          this.etapa = 'Finalizar';
          return this.indexConfig++;
        }
      }
      // Etapa 3
      else if(this.indexConfig == 3){
        this.etapa = 'Finalizar';
        this.finalizar();
      }
    },
    prevConfig: function(){
      if(this.indexConfig > 1){
        this.etapa = 'Próxima';
        this.indexConfig--;
        if(this.config['servidor']['tipo'] == 'json' && this.indexConfig == 2){
          this.indexConfig--;
        }
      }
    },
    testDB: function(){
      var user = new FormData();
          user.append('host', this.config['mysql']['host']);
          user.append('dbname', this.config['mysql']['dbname']);
          user.append('user', this.config['mysql']['user']);
          user.append('senha', this.config['mysql']['senha']);

      let url = 'install.php/db';

      let header = {'Content-Type': 'application/x-www-form-urlencoded'};

      this.$http.post(url, user)
      .then(function(res) {
        this.error = true;
        this.error_log = res.bodyText;
        return false;
      }).catch( function(err){
        //return console.log(err);
      });
    },
    finalizar: function(){
      var user = new FormData();

          user.append('url', this.config['servidor']['url']);
          user.append('type', this.config['servidor']['tipo']);
          user.append('admin', this.config['servidor']['admin']);
          user.append('admin_senha', this.config['servidor']['senha']);

          user.append('host', this.config['mysql']['host']);
          user.append('dbname', this.config['mysql']['dbname']);
          user.append('user', this.config['mysql']['user']);
          user.append('senha', this.config['mysql']['senha']);

      let url = 'install.php/ff';

      let header = {'Content-Type': 'application/x-www-form-urlencoded'};

      this.$http.post(url, user)
      .then(function(res) {
        this.error = true;
        this.error_log = res.bodyText;

        if(res.bodyText == 'ok'){
          this.error = false;
          this.sucesso = true;
        }


        console.log(res);
        return false;
      }).catch( function(err){
        this.error = true;
        this.error_log = err.bodyText;
        return console.log(err);
      });
    },
  }
});