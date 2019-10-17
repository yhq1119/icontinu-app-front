# responsive-app

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### [IMPORTANT!] Local proxy setting

In 'vue.config.js'file, edit the corresponding settings as follow:
set

proxy:{
    '<SEMI_DOMIN>':{ // for example:'/iContinu'
        target:'<TARGET_DOMIN>', // for example:'<http://157.245.63.35:8000/'> or '<http://127.0.0.1:8000/'>
    }
}

By doing this, when running on local, the remote API request would be proxy to local to secure a cookie head http request.

############################
