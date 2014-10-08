# Tanner

Experimental Javascript Text Generator for Node.js.
Heavily inspired by [Rant](https://github.com/TheBerkin/Rant).

## Usage

On the command line, use the `node index.js generate` command, followed by
your query expression, to generate corresponding results. Example:

```
node index.js generate "<name> <verb.s-transitive> <adj.normal> <noun.plural>."
```

Possible result: *Kimberly oils chrome-plated tabletops.*

You can type `node index.js` to get a list of all available commands. Utility
functions include:

- `index`: show dictionary list
- `overview`: show vocabulary types, subtypes and classes
- `list` show full vocabulary list (long)
- `find timenoun.plural-dayofweek` to find plural weekdays

Tanner can also be `require`d and used as a Node.js module, but this is mainly
untested and undocumented as of now. You could read the source code to see how
you can work with it.

## License

The MIT License (MIT)

Copyright (c) 2014 Felix Fischer <kontakt@felixfischer.com> (felixfischer.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
