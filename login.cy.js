import * as data from "../helpers/default_data.json"


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
           cy.visit('/');//зашли на сайт
           cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');//проверяю цвет кнопки восстановить пароль
          });

          afterEach('Конец теста', function () {
            cy.get('#exitMessageButton > .exitIcon').should('be.visible');//есть крестик и он виден для пользователя;
           });


        it('Верный логин и верный пароль', function () {
            cy.get('#mail').type(data.login);//ввели верный логин
            cy.get('#pass').type(data.password);//ввели верный пароль
            cy.get('#loginButton').click();//нажали войти

            cy.wait(500)//неправильный способ сделать задержку для бэка

            cy.get('#messageHeader').contains('Авторизация прошла успешно');//проверяю,что после авторизации вижу текст
            cy.get('#messageHeader').should('be.visible');//текст виден пользователю
        });


        it('Верный логин и неверный пароль', function () {
            cy.get('#mail').type(data.login);//ввели верный логин
            cy.get('#pass').type('iLoveqastudio7');//ввели неверный пароль
            cy.get('#loginButton').click();//нажали войти
            cy.get('#messageHeader').contains('Такого логина или пароля нет');//проверяю,что после авторизации вижу текст
            cy.get('#messageHeader').should('be.visible');//текст виден пользователю

        });


        it('проверка,что в логине есть @', function () {
            cy.get('#mail').type('germandolnikov.ru');//ввели логин без @
            cy.get('#pass').type(data.password);//ввели верный пароль
            cy.get('#loginButton').click();//нажали войти
            cy.get('#messageHeader').contains('Нужно исправить проблему валидации');//проверяю,что после авторизации вижу текст
            cy.get('#messageHeader').should('be.visible');//текст виден пользователю         
        });


        it('проверка,восстановления пароля', function () {
            cy.get('#forgotEmailButton').click();//нажали восстановить пароль
            cy.get('#mailForgot').type('german@dolnikov.ru');//ввели почту для восстановления
            cy.get('#restoreEmailButton').click();//нажали кпопку отправить код
            cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');//проверяю,что после отправки почты вижу текст
            cy.get('#messageHeader').should('be.visible');//текст виден пользователю
        });


        it('Неверный логин и верный пароль', function () {
            cy.get('#mail').type('german@dolniko.ru');//ввели неверный логин
            cy.get('#pass').type(data.password);//ввели верный пароль
            cy.get('#loginButton').click();//нажали войти
            cy.get('#messageHeader').contains('Такого логина или пароля нет');//проверяю,что после авторизации вижу текст
            cy.get('#messageHeader').should('be.visible');//текст виден пользователю
        });

        it('Приведение к строчным буквам в логине', function () {
            cy.get('#mail').type('GerMan@Dolnikov.ru');//ввели верный логин разной высоты
            cy.get('#pass').type(data.password);//ввели верный пароль
            cy.get('#loginButton').click();//нажали войти
            cy.get('#messageHeader').contains('Авторизация прошла успешно');//проверяю,что после авторизации вижу текст
            cy.get('#messageHeader').should('be.visible');//текст виден пользователю
        });// должен быть неудачным,найден баг
    })
