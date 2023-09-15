const chai = require('chai');
const chaiHttp = require('chai-http');
//------------------------------------------------------------------------------------------------
const Token_Access_Test = require('./utils/test_tokenAccess');
//------------------------------------------------------------------------------------------------
let token;
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);
//------------------------------------------------------------------------------------------------
before(done => {
    console.log('  START TESTS\n-------------------------');
    done();
});
//------------------------------------------------------------------------------------------------
describe('/TEST SECURITY REQUESTS', () => {
    it('check "/authenticate" not real user', (done) => {
        chai.request(server)
          .post('/authenticate')
          .send({'password': '333', 'name': 'notRealNameUser'})
          .end((error, res) => {
            if(error){
                console.log(error);
            }
            res.should.have.status(401);
            res.body.should.have.property('message').eql('Пользователя с таким именем не существует');
            done();
          });
    });
    it('check "/authenticate" real user, but not correct password', (done) => {
        chai.request(server)
          .post('/authenticate')
          .send({'password': '333', 'name': 'Kontur'})
          .end((error, res) => {
            if(error){
                console.log(error);
            }
            res.should.have.status(401);
            res.body.should.have.property('message').eql('Не правильные имя или пароль');
            done();
          });
    });
    it('check "/authenticate" real user and correct password', (done) => {
        chai.request(server)
          .post('/authenticate')
          .send({'password': 'Aa123456', 'name': 'Kontur'})
          .end((error, res) => {
            if(error){
                console.log(error);
            }
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Выполнено успешно');
            token = res.body.token;
            done();
          });
    });
    it('check "/" without token', (done) => {
        chai.request(server)
          .get('/')
          .end((error, res) => {
            if(error){
                console.log(error);
            }
            res.should.have.status(401);
            res.body.should.have.property('message').eql('Пожалуйста, отправьте токен');
            done();
          });
    });
    it('check "/" not correct token', (done) => {
        chai.request(server)
          .get('/')
          .set({'token':'2342'})
          .end((error, res) => {
            if(error){
                console.log(error);
            }
            res.should.have.status(403);
            res.body.should.have.property('message').eql('Токен недействителен');
            done();
          });
    });
});
//------------------------------------------------------------------------------------------------
describe('/TEST PRODUCT REQUESTS', () =>{
    it('check "/products" ', (done) => {
      chai.request(server)
        .get('/products')
        .set({'token':token})
        .end((error, res) => {
          if(error){
            console.log(error);
          }
          res.should.have.status(200);
          done();
        });
    });      
    it('check "/products/productId" we have product', (done) => {
        chai.request(server)
          .get('/products/1')
          .set({'token':token})
          .end((error, res) => {
            if(error){
              console.log(error);
            }
            res.should.have.status(200);
            done();
          });
    });  
    it('check "/products/productId" we dont have product', (done) => {
        chai.request(server)
          .get('/products/0')
          .set({'token':token})
          .end((error, res) => {
            if(error){
              console.log(error);
            }
            res.should.have.status(404);
            res.body.should.have.property('message').eql('не найден продукт с таким productId');
            done();
          });
    }); 
});
//------------------------------------------------------------------------------------------------
after(done => {
  console.log('-------------------------\n   END TESTS');
  done();
});