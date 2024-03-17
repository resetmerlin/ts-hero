## Why Functions Need Generics

One of the most common needs a TypeScript developer faces is the need to pass generic type arguments to functions. Then, those functions can use and manipulate those parameters.

In many situations, we don't need functions to be generic. The function might be written in such a way as to only work for one type of data (e.g. `string` or `number`). But, other times, we write functions where we want to pass the data type along from input to output.

## Understanding Generic Syntax

In a previous challenge on [generic type arguments](https://typehero.dev/challenge/generic-type-arguments) we saw a `Row` type that looked like this:

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>interface</span><span> </span><span>Row</span><span>&lt;</span><span>T</span><span>&gt;</span><span> </span><span>{</span><span>
</span><span>  label</span><span>:</span><span> </span><span>string</span><span>;</span><span>
</span><span>  value</span><span>:</span><span> </span><span>T</span><span>;</span><span>
</span><span>  disabled</span><span>:</span><span> </span><span>boolean</span><span>;</span><span>
</span><span></span><span>}</span></code></section>
```

Imagine if you had a function `createRow` that returns an object that looked like our `Row` type:

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>const</span><span> createRow </span><span>=</span><span> </span><span>(</span><span>
</span><span>  label</span><span>:</span><span> </span><span>string</span><span>,</span><span>
</span>
<span>  </span><span>// how do we provide a type for `value`?</span><span>
</span><span>  value</span><span>:</span><span> </span><span>unknown</span><span>,</span><span>
</span>
<span>  disabled </span><span>=</span><span> </span><span>false</span><span>,</span><span>
</span><span></span><span>)</span><span> </span><span>=&gt;</span><span> </span><span>(</span><span>{</span><span>
</span><span>  label</span><span>,</span><span>
</span><span>  value</span><span>,</span><span>
</span><span>  disabled</span><span>,</span><span>
</span><span></span><span>}</span><span>)</span><span>;</span></code></section>
```

Similarly to how we used the `<` and `>` for our `Row` interface, we place the `<` and `>` right before the parenthesis that start our function's arguments.

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>const</span><span> createRow </span><span>=</span><span> </span><span>&lt;</span><span>T</span><span>,</span><span>&gt;</span><span>(</span><span>label</span><span>:</span><span> </span><span>string</span><span>,</span><span> value</span><span>:</span><span> </span><span>T</span><span>,</span><span> disabled </span><span>=</span><span> </span><span>false</span><span>)</span><span> </span><span>=&gt;</span><span> </span><span>(</span><span>{</span><span>
</span><span>  </span><span>//...</span><span>
</span><span></span><span>}</span><span>)</span><span>;</span></code></section>
```

This is great! Now our `value` parameter has the right type!

### A Word On A Syntax Quirk

You may see the `<T,>` syntax out in the wild. There's an unfortunate inconvenience with TypeScript's syntax that this is used to work around. Imagine being a parser and seeing `const createRow = <T>`. If you don't know what's coming next it could be ambiguous between these two things

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>// Thing 1: Start of JSX</span><span>
</span><span></span><span>const</span><span> createRow </span><span>=</span><span> </span><span>&lt;</span><span>T</span><span>&gt;</span><span>Some</span><span> </span><span>JSX</span><span> stuff</span><span>!</span><span>&lt;</span><span>/</span><span>T</span><span>&gt;</span><span>;</span><span>
</span>
<span></span><span>// Thing 2: start of generic function</span><span>
</span><span></span><span>const</span><span> createRow </span><span>=</span><span> </span><span>&lt;</span><span>T</span><span>&gt;</span><span>(</span><span>someArg</span><span>:</span><span> </span><span>T</span><span>)</span><span> </span><span>=&gt;</span><span> </span><span>{</span><span>
</span><span>  </span><span>/* some function stuff */</span><span>
</span><span></span><span>}</span></code></section>
```

Because of this ambiguity, we need to do something to _disambiguate_ these two situations to the TypeScript compiler. In the early days it was common to use `<T extends unknown>` (or `<T extends any>` before `unknown` existed in TypeScript); however, over time people realized there was an easier way: `<T,>`. Since `,` is invalid in JSX, but valid in TypeScript when separating multiple arguments, it's appropriate to use this to disambiguate the two situations to the TypeScript compiler.

With that being said, if you see this strange syntax, please note that it is not you, it's just TypeScript being a bit funky. If this is confusing to you, just skip it and come back here and read it again when the day comes that you first see this syntax out in the wild.

## Solving This Challenge

This challenge asks you to make an `identity` function. This function does nothing and returns what it was passed with no modifications.

> Note: mathematicians love `identity` operations, so computer scientists use them too so we can seem cool to the mathematicians.

The next function (`mapArray`) is admittedly pretty hard, but take it slow and think about it one step at a time. Ask yourself:

> what is the type of `arr`

Then, provide a generic argument as a type for `arr`. After you do that, think about what types you need to provide for `fn`.

In this particular case, if you spend a few minutes with it don't be afraid to check out some solutions. The second example is here to widen your perspective more than anything else. It's good to wrestle with tough problems, even ones that are above your ability level.