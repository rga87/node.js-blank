const assert = require('assert');
const TokenAccess = require('../../utils/tokenAccess');
describe('/TEST TokenAccess', () => { 
    //-----------------------------------------------------------------------------------------------------------------// 
    it('tokenAccess: правильно проходит все тесты getToken:', () => {
        let myUndefined;
        assert.equal(TokenAccess.getToken(myUndefined),'error');
        assert.equal(TokenAccess.getToken('name'),'eyJhbGciOiJIUzI1NiJ9.bmFtZQ.2kBP2UmUM1cHY96jcRh3dsxP9A4w3YyAKsaDpuGn_YE');
    }); 
    //-----------------------------------------------------------------------------------------------------------------//
    it('tokenAccess: правильно проходит все тесты verifyToken:', async() => {
        let myUndefined;
        assert.equal(await TokenAccess.verifyToken(myUndefined),false);
        assert.equal(await TokenAccess.verifyToken('token'),false);
    }); 
});