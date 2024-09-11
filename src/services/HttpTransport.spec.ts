import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { createSandbox, SinonStub } from 'sinon';
import HttpTransport from './HttpTransport';
describe('HTTP transport', () => {
    use(sinonChai)
    const sandbox = createSandbox();
    let http: HttpTransport;
    let request: SinonStub<any>;
    beforeEach(() => {
        http = new HttpTransport();
        request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(() => new Promise<XMLHttpRequest>(() => null))
    })
    afterEach(() => {
        sandbox.restore();
    })
    it('should stringify query object for GET request', () => {
        http.get('', { data: { a: "1", b: "2" } })
        expect(request).calledWithMatch('?a=1&b=2')
    })

})
