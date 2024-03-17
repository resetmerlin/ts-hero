Hello, World!

In Type Challenges, we use the type system itself to do the assertion.

For this challenge, you will need to change the following code to make the tests pass (no type check errors).

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>// expected to be string</span><span>
</span><span></span><span>type</span><span> </span><span>HelloWorld</span><span> </span><span>=</span><span> </span><span>any</span></code></section>
```

```
<section node="[object Object]" id="code-lang-ts"><code tabindex="0"><span>// you should make this work</span><span>
</span><span></span><span>type</span><span> </span><span>test</span><span> </span><span>=</span><span> </span><span>Expect</span><span>&lt;</span><span>Equal</span><span>&lt;</span><span>HelloWorld</span><span>,</span><span> </span><span>string</span><span>&gt;&gt;</span></code></section>
```

Click the `Take the Challenge` button to start coding! Happy Hacking!

This challenge was ported from [Type Challenges](https://tsch.js.org/) and was authored by [antfu](https://www.github.com/antfu)
