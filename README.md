#Angular Single Page Application with Node.js

##Angular UI-Router
This repository contains a highly scalable Angular application that utilizes different named views with Absolute paths. Below, I have included all of the code displayed in the `home` state. Additionally, I have mapped the named views below to specific templates, all relative to their Absolute state. By taking this approach, I have created an application that can be easily modified by dropping in different views. You can see more info about absolute views in the [UI-Router docs]('https://github.com/angular-ui/ui-router/wiki/Multiple-Named-Views').


```
<div ui-view="Header"></div>
<div class="wrap">
    <div ui-view="Main-Content"></div>
</div>
<div ui-view="Footer"></div>
```


##Susy Custom Grid
In addition to coming configured with Angular, the following SPA has been created using the Susy grid framework. I have kept the debug option on, so you can see the differences made to the grid when different values are passed in. 