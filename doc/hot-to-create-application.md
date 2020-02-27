[↑ Main contents](contents.md)

To create application with themes you should separate styles which are theme based and provide mixins which will define custom styles for your components.

## Example
We have a component called `custom`. By default angular should generate this files:
* custom.component.html
* custom.component.scss
* custom.component.spec.ts
* custom.component.ts
Now we have to create one more file with mixin for our component. Let's name it `custom.component.mixin.scss`. Let's make backgroun of this component little bit darken than our primary color:
```scss
@mixin custom-component-mixin($theme) {
    $primary: map-get($theme, 'primary');

    custom-component {
        background-color: darken($primary, 0.05);
    }
}
```
Now we have to include this mixin in our `themes.scss` file and call it:
```scss
/* Import or define your theme-based mixins */

@import 'app/custom/custom.component.mixin';

@mixin application-mixin($theme) {
    @include custom-component-mixin($theme);
}

/* And call them! */
@include application-mixin($theme);
```