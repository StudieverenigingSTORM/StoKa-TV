.PHONY: error
error:
	@echo "No target specified!"
	@echo "Use \`make slides' to build HTML files for slides"
	@exit 1

slides_in  := $(wildcard *.txt)
slides_out  := $(slides_in:.txt=.html)

%.html: %.txt
	@echo "Building $@"
	@pandoc -t revealjs -s $< -o $@ -V theme=simple

.PHONY: slides
slides: $(slides_out)
	@echo "Done!"
