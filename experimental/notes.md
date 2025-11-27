# MinOS

**Technical Notes**

(1) The MinOS Architecture consists of three levels, each higher-level and launched after the previous.
  1. The first level of MinOS is the kernel, in kernel.js. This level is responsible for the filesystem, the task scheduler, and loading the initalizer that the booter calls ('System/Library/launcher.js'). This level is called MILK (MILK Is a Kernel)
  2. The second level of MinOS are the core libraries (such as System/Library/cursors.pack and System/Library/require.pack). These are responsible for loading and executing the processes, functions, libraries, and classes that the third level of MinOS uses. This level is called ALG (ALG's like GNU)
  3. The third level of MinOS is the grapical shell. This is responsible for extending MinOS functionality from the terminal to a GUI and interactive display. This level is called RIBS (RIBS is a Shell)

-# yes, i like recursive acronyms

Together, these make the M/A/R System, or MinOS MARS for short.
