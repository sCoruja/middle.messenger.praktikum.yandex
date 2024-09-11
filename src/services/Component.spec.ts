import { expect } from "chai";
import Component, { ComponentProps } from "./Component";
// import Sinon from "sinon";
import Handlebars from 'handlebars';

describe('Component', () => {
    let blockClass: typeof Component;

    before(() => {
        class Button extends Component {
            constructor(props?: ComponentProps) {
                super({ ...props })
            }

            render() {
                const template = Handlebars.compile('<div id="div">{{text}}</div>')
                return this.compile(template, { ...this.props })
            }
        }
        blockClass = Button;
    })
    it('should render props', () => {
        const text = 'Test';
        const component = new blockClass({ text })
        const res = component.element?.innerHTML
        expect(res).to.be.eq(text)
    })

})
