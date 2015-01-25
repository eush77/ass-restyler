[![npm](https://nodei.co/npm/ass-restyler.png)](https://nodei.co/npm/ass-restyler/)

# ass-restyler

[![Dependency Status][david-badge]][david]

Change SSA/ASS subtitle styles from the command line.

[david]: https://david-dm.org/eush77/ass-restyler
[david-badge]: https://david-dm.org/eush77/ass-restyler.png

## Example

```
ass-restyler Default:MarginV=335 Default:Fontsize+=10 <input.ass >output.ass
```

## CLI

```
ass-restyler [clause]... <input.ass >output.ass
ass-restyler --help
```

Clauses:
  - `Style:Property=Value`
  - `Style:Property+=Value` (if it makes sense for the property)
  - `Style:Property-=Value` (if it makes sense for the property)

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
