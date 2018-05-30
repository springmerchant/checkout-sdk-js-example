# Checkout JS SDK Example

This repository features a React example that uses [Bigcommerce's Checkout JS SDK](https://github.com/bigcommerce/checkout-sdk-js) to illustrate how to build custom checkout solution for a BigCommerce store.


## Getting Started

### Installation

You can install this example using [npm](https://www.npmjs.com/get-npm):

```
npm install --save @bigcommerce/checkout-sdk-example
```

or via CDN:

```
<script src="https://cdn8.bigcommerce.com/s-wmv3nwatp6/content/example.js"></script>
```


### Usage

Add a `<div>` element above the `<script>` tag with the id of `checkout-app` in the page where you want the checkout to be render:

```
<div id="checkout-app"></div>
```

## Development

To run this example locally, simply run the following:

```
npm install && npm run dev
```

To build:

```
npm run build
```


## See Also

* [Checkout JS SDK](https://github.com/bigcommerce/checkout-sdk-js)
* [Storefront APIs](https://developer.bigcommerce.com/api/v3/storefront.html)
* [React](https://reactjs.org/)

## License

This repository is [MIT Licensed](LICENSE.md).
