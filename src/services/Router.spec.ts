import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import Router from './Router';
import Handlebars from 'handlebars';
import Component, { ComponentProps } from './Component';

describe('Router', () => {
    use(sinonChai)
    let router: Router;
    let componentClass: typeof Component
    beforeEach(() => {
        router = new Router('#app');
        router.start()
        class Button extends Component {
            constructor(props?: ComponentProps) {
                super({ ...props })
            }

            render() {
                const template = Handlebars.compile('<div id="div">{{text}}</div>')
                return this.compile(template, { ...this.props })
            }
        }
        componentClass = Button;

    })
    it('should add route at router', () => {
        router.use('/1', componentClass)
        router.use('/2', componentClass)
        expect(router.routes?.length).to.eq(2);
    })
    it('should change history state', () => {
        router.go('/1')
        expect(router.history?.length).to.eq(2);
    })

})
