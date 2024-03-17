## Why We Need Generic Type Arguments

If primitive (and literal) types are data, you can think of generics as functions that operate on that data.

And just like functions often need arguments, we need some way to provide inputs to generic types.

## How To Use Generic Arguments

Instead of using parenthesis to pass arguments, with generics we use angled brackets: `<` and `>`.

Other than that, there are a lot of similarities between the two concepts.

> You can even provide defaults for generic arguments! See the relevant challenge for [generic defaults](https://typehero.dev/challenge/default-generic-arguments).

There are two separate situations when you'd use this syntax. One is when you're working strictly with types, and another is when you're doing more normal JavaScript-y stuff like with functions and constants.

### Universe 1: strictly in the type system

Just take a look:

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>interface</span><span> </span><span>Row</span><span>&lt;</span><span>T</span><span>&gt;</span><span> </span><span>{</span><span>
</span><span>  label</span><span>:</span><span> </span><span>string</span><span>;</span><span>
</span><span>  value</span><span>:</span><span> </span><span>T</span><span>;</span><span>
</span><span>  disabled</span><span>:</span><span> </span><span>boolean</span><span>;</span><span>
</span><span></span><span>}</span></code></section>
```

> Note: It's common (and acceptable) in situations like this where we _really don't know anything else_ about the Generic type parameter to use a single letter like `T`. But the moment you have multiple arguments (or more context for what this type will be) it's a good idea to use more descriptive names.

What this syntax means is that we have a `Row` type, and we know it will have a `value` property, but the _specific type_ of that `value` property is not known until it's used.

We could store `number`s in this `Row` type. If we did, it'd look like this:

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>type</span><span> </span><span>NumberRow</span><span> </span><span>=</span><span> </span><span>Row</span><span>&lt;</span><span>number</span><span>&gt;</span><span>;</span></code></section>
```

Or we could store `string`s:

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>type</span><span> </span><span>StringRow</span><span> </span><span>=</span><span> </span><span>Row</span><span>&lt;</span><span>string</span><span>&gt;</span><span>;</span></code></section>
```

Because TypeScript is a structural type system, `Row<string>` is exactly equivalent (in every way) to if we had written this:

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>type</span><span> </span><span>StringRow</span><span> </span><span>=</span><span> </span><span>{</span><span>
</span><span>  label</span><span>:</span><span> </span><span>string</span><span>;</span><span>
</span><span>  value</span><span>:</span><span> </span><span>string</span><span>;</span><span>
</span><span>  disabled</span><span>:</span><span> </span><span>boolean</span><span>;</span><span>
</span><span></span><span>}</span><span>;</span></code></section>
```

But because we used a generic, we didn't have to type all that other stuff out every time.

### Multiple Generic Arguments

Just like functions can take multiple arguments, so too can Generics.

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>type</span><span> </span><span>GroceryItem</span><span>&lt;</span><span>Name</span><span>,</span><span> </span><span>Price</span><span>,</span><span> </span><span>InStock</span><span>&gt;</span><span> </span><span>=</span><span> </span><span>{</span><span>
</span><span>  name</span><span>:</span><span> </span><span>Name</span><span>;</span><span>
</span><span>  price</span><span>:</span><span> </span><span>Price</span><span>;</span><span>
</span><span>  inStock</span><span>:</span><span> </span><span>InStock</span><span>;</span><span>
</span><span></span><span>}</span><span>;</span></code></section>
```

Now you can pass arguments to this type:

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>type</span><span> </span><span>AvocadoToast</span><span> </span><span>=</span><span> </span><span>GroceryItem</span><span>&lt;</span><span>'Avocado Toast'</span><span>,</span><span> </span><span>12.99</span><span>,</span><span> </span><span>true</span><span>&gt;</span><span>;</span></code></section>
```

This is exactly equal to if you had written:

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>type</span><span> </span><span>AvocadoToast</span><span> </span><span>=</span><span> </span><span>{</span><span>
</span><span>  name</span><span>:</span><span> </span><span>'Avocado Toast'</span><span>;</span><span>
</span><span>  price</span><span>:</span><span> </span><span>12.99</span><span>;</span><span>
</span><span>  inStock</span><span>:</span><span> </span><span>true</span><span>;</span><span>
</span><span></span><span>}</span><span>;</span></code></section>
```

> Note: you might notice that we're missing types for our type arguments! Right now there's nothing stopping us from sending in wrong values like `GroceryItem<number[], boolean, { over: 9000 }>`. We'll cover that in a future challenge on [generic type constraints](https://typehero.dev/challenge/generic-type-constraints).

## Solving This Challenge

Similar to what we did with `AvocadoToast`, create a `CapreseSalad` type, and fill in the right values to make the tests pass.

Then, create a new generic type for `GroceryStore`. Let the tests guide you regarding what the final type should look like and what the inputs should be.
