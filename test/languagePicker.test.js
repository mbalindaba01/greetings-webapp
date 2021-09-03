let assert = require('assert')
let LanguagePicker = require('../languagePicker')

describe('LanguagePicker function', () => {
    describe('Set Values', () => {
        it('should be able to set the language of the greeting to IsiXhosa', () => {
            let pickLanguage = LanguagePicker()
            pickLanguage.setLanguage('IsiXhosa')

            assert.strictEqual('IsiXhosa', pickLanguage.getLanguage())
        });

        it('should be able to set the language of the greeting to IsiZulu', () => {
            let pickLanguage = LanguagePicker()
            pickLanguage.setLanguage('IsiZulu')

            assert.strictEqual('IsiZulu', pickLanguage.getLanguage())
        });

        it('should be able to set the language of the greeting to English', () => {
            let pickLanguage = LanguagePicker()
            pickLanguage.setLanguage('English')

            assert.strictEqual('English', pickLanguage.getLanguage())
        });
        
    });

    describe('Use Values', () => {
        it('should return "Sawubona " if the language of greeting is IsiZulu', () => {
            let pickLanguage = LanguagePicker()
            pickLanguage.setLanguage('IsiZulu')
            pickLanguage.setGreetText('Sawubona ')

            assert.strictEqual('Sawubona ', pickLanguage.getGreetText())
        });

        it('should return "Molo " if the language of greeting is IsiXhosa', () => {
            let pickLanguage = LanguagePicker()
            pickLanguage.setLanguage('IsiXhosa')
            pickLanguage.setGreetText('Molo ')

            assert.strictEqual('Molo ', pickLanguage.getGreetText())
        });

        it('should return "Hello " if the language of greeting is English', () => {
            let pickLanguage = LanguagePicker()
            pickLanguage.setLanguage('English')
            pickLanguage.setGreetText('Hello ')

            assert.strictEqual('Hello ', pickLanguage.getGreetText())
        })
        
    });
    
    
});
