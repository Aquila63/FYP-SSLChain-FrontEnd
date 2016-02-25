all:

install: ;
	$(MAKE) -C server install;

clean: ;
	$(MAKE) -C server clean;

.PHONY: install clean
