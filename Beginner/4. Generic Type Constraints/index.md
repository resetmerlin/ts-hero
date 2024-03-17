## The Problem Generic Type Constraints Solve

Generics are an incredibly powerful tool in TypeScript. In a [previous challenge](https://typehero.dev/challenge/generic-type-arguments) where generic type arguments were introduced, we compared them to function arguments _but for types_.

Consider the parallel of these two:

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>//             v-----v argument identifier</span><span>
</span><span></span><span>const</span><span> </span><span>drive</span><span> </span><span>=</span><span> </span><span>(</span><span>carType</span><span>:</span><span> </span><span>CarType</span><span>)</span><span> </span><span>=&gt;</span><span> </span><span>{</span><span>
</span><span>  </span><span>//                  ^-------^ argument type constraint</span><span>
</span><span>  </span><span>// ....</span><span>
</span><span></span><span>}</span><span>;</span><span>
</span>
<span></span><span>//        v-------v type parameter identifier</span><span>
</span><span></span><span>type</span><span> </span><span>Drive</span><span>&lt;</span><span>CarType</span><span>&gt;</span><span> </span><span>=</span><span> </span><span>(</span><span>carType</span><span>:</span><span> </span><span>CarType</span><span>)</span><span> </span><span>=&gt;</span><span> </span><span>{</span><span>
</span><span>  </span><span>// ....</span><span>
</span><span></span><span>}</span><span>;</span></code></section>
```

Notice that there's no type constraint for the type parameter identifier.

That means that if we make a type like this:

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>type</span><span> </span><span>Row</span><span>&lt;</span><span>T</span><span>&gt;</span><span> </span><span>=</span><span> </span><span>{</span><span>
</span><span>  value</span><span>:</span><span> </span><span>T</span><span>;</span><span>
</span><span>  label</span><span>:</span><span> </span><span>string</span><span>;</span><span>
</span><span>  orientation</span><span>:</span><span> </span><span>'vertical'</span><span> </span><span>|</span><span> </span><span>'horizontal'</span><span>;</span><span>
</span><span></span><span>}</span><span>;</span></code></section>
```

A consumer of this type could pass literally _anything_ for Row. All of these would be valid:

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>type</span><span> </span><span>BooleanRow</span><span> </span><span>=</span><span> </span><span>Row</span><span>&lt;</span><span>boolean</span><span>&gt;</span><span>;</span><span>
</span><span></span><span>type</span><span> </span><span>RegexRow</span><span> </span><span>=</span><span> </span><span>Row</span><span>&lt;</span><span>RegExp</span><span>&gt;</span><span>;</span><span>
</span><span></span><span>type</span><span> </span><span>RowRowRowStringRow</span><span> </span><span>=</span><span> </span><span>Row</span><span>&lt;</span><span>Row</span><span>&lt;</span><span>Row</span><span>&lt;</span><span>Row</span><span>&lt;</span><span>string</span><span>&gt;&gt;&gt;</span><span>&gt;</span><span>;</span><span>
</span><span></span><span>type</span><span> </span><span>VoidFuncRow</span><span> </span><span>=</span><span> </span><span>Row</span><span>&lt;</span><span>(</span><span>)</span><span> </span><span>=&gt;</span><span> </span><span>void</span><span>&gt;</span><span>;</span></code></section>
```

But our Row component is likely to not be written in such a way to handle _literally anything_ being passed in as a type. We need to set some static boundaries on what kinds of things are passed in for `T` to `Row`.

_We need types for our types._

Well. That's kinda what Generic type constraints are: _type constraints for your parameterized types_!

It's a mouthful, but let's break it down step by step.

So, let's say that our component is advanced enough to handle three things:

- `string`: a row with a string value
- `number`: a row with a numeric value
- `() => string | number`: a row with a lazily evaluated value that can itself be a string or a number

Let's make a type alias for our constraints:

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>type</span><span> </span><span>RowConstraints</span><span> </span><span>=</span><span> </span><span>string</span><span> </span><span>|</span><span> </span><span>number</span><span> </span><span>|</span><span> </span><span>(</span><span>(</span><span>)</span><span> </span><span>=&gt;</span><span> </span><span>string</span><span> </span><span>|</span><span> </span><span>number</span><span>)</span><span>;</span></code></section>
```

> Note: Function type notation must be parenthesized when used in a union type (otherwise it might be ambiguous).

To tell TypeScript that we only want to allow `Row` to accept types that fall into one of these categories we specified in `RowConstraints` we use the `extends` keyword.

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>type</span><span> </span><span>Row</span><span>&lt;</span><span>T</span><span> </span><span>extends</span><span> </span><span>RowConstraints</span><span>&gt;</span><span> </span><span>=</span><span> </span><span>{</span><span>
</span><span>  value</span><span>:</span><span> </span><span>T</span><span>;</span><span>
</span><span>  label</span><span>:</span><span> </span><span>string</span><span>;</span><span>
</span><span>  orientation</span><span>:</span><span> </span><span>'vertical'</span><span> </span><span>|</span><span> </span><span>'horizontal'</span><span>;</span><span>
</span><span></span><span>}</span><span>;</span></code></section>
```

Now, if we try to use our `Row` generic with anything that doesn't match the above, TypeScript will report an error:

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>type</span><span> </span><span>StringArrayRow</span><span> </span><span>=</span><span> </span><span>Row</span><span>&lt;</span><span>string</span><span>[</span><span>]</span><span>&gt;</span><span>;</span><span>
</span><span></span><span>//                        ^?</span></code></section>
```

## Solving This Challenge

Let the tests guide you on what specific constraints each type needs. By the end of this challenge, it should start to feel pretty robotic to add type constraints.
