# MinOS

**Technical Notes**
(1) The MinOS Architecture consists of three levels, each higher-level and launched after the previous.
  1. The first level of MinOS is the kernel, in kernel.js. This level is responsible for the filesystem ('minfs'), the task scheduler ('mintask'), and loading the initalizer that the booter calls ('System/Library/launcher.js')
  2. The second level of MinOS are the core libraries (such as System/Library/cursors.pack and System/Library/require.pack). These are responsible for loading and executing the processes, functions, libraries, and classes that the third level of MinOS uses.
  3. The third level of MinOS is the grapical shell. This is responsible for extending MinOS functionality from the terminal to a GUI and interactive display.
