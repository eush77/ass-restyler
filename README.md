[![npm](https://nodei.co/npm/ass-restyler.png)](https://nodei.co/npm/ass-restyler/)

# ass-restyler

[![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

Transform SSA/ASS subtitle styles on the command line.

[travis]: https://travis-ci.org/eush77/ass-restyler
[travis-badge]: https://travis-ci.org/eush77/ass-restyler.svg
[david]: https://david-dm.org/eush77/ass-restyler
[david-badge]: https://david-dm.org/eush77/ass-restyler.png

## Example

Bring `Default` style to middle of the screen and adjust font size:

```
$ ass-restyler Default:MarginV=335 Default:Fontsize+=10 input.ass >output.ass
```

## CLI

```
ass-restyler [clause]... [file]
```

Reads SSA/ASS subtitle from `file` or stdin and outputs transformed SSA/ASS on the standard output.

Clauses:
  - `Style:Attribute=Value`
  - `Style:Attribute+=Value` (if it makes sense for the attribute)
  - `Style:Attribute-=Value` (if it makes sense for the attribute)
  - `Style:Attribute*=Value` (if it makes sense for the attribute)

## References

- [Wikipedia page](http://en.wikipedia.org/wiki/SubStation_Alpha)
- [format specification](http://www.perlfu.co.uk/projects/asa/ass-specs.doc)
- [ASS styles](http://docs.aegisub.org/3.2/Styles/)

## Install

```shell
npm install ass-restyler -g
```

## License

MIT
