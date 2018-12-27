# Hotel NUXT.js

> Nuxt.js + PWA + Vuetify.js 

## Общее

Этот проект построен c помощью NUXT.js  и следующих nuxt-плагинов:

- [Axios](https://github.com/nuxt-community/axios-module)
- [Browserconfig](https://github.com/nuxt-community/modules/tree/master/packages/browserconfig)
- [Component-cache](https://github.com/nuxt-community/modules/tree/master/packages/component-cache)
- [Google-analytics](https://github.com/nuxt-community/analytics-module)
- [PWA](https://github.com/nuxt-community/pwa-module)
- [Sentry](https://github.com/nuxt-community/sentry-module)
- [Sitemap](https://github.com/nuxt-community/sitemap-module)

А так же Vue фреймворки:

- [Vuetify](https://vuetifyjs.com)
- [VeeValidate](https://baianat.github.io/vee-validate/)

## Установка

```bash
# Установить зависимости
$ npm install

# Сервер в горячей перезагрузкой localhost:3000
$ npm run dev

# для продакшн сервера
$ npm run build
$ npm run start

# Генерация статичного проекта для SHARED хостинга
$ npm run generate
```

## Не забудь

Не забудьте добавить свой часовой Sentry DSN и идентификатор Google Analytics в `nuxt.config.js` file.

## License

[MIT License](license.md)

Copyright (c) Max Voitsekhovsky (@voitsekhovskymax)
