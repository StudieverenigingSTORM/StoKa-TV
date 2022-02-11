# StoKa-TV
Promotional display in the StoKa.  
(Will replace [STORMTV](https://github.com/StudieverenigingSTORM/STORMTV))

## General
This document contains general documentation, such as diagrams, about this project.

### System overview
Concept for the deployment of the different components of the solution. (Different deployments may be possible)

![System overview](./system_overview.drawio.svg)

### TV application
The TV application constitutes the public part of the solution.
It has limited interactivity.
Content cannot be authored through this application.
This application is also available in the browser to preview7review the content.

![Flowchart TV application](./flow_tv.drawio.svg)

### Content Management
![Use-case Content Management](./use-case_cms.drawio.svg)

## Prerequisites
+ [GNU Make](https://www.gnu.org/software/make/)
+ [Docker](https://hub.docker.com/search?offering=community&q=&type=edition&platform=desktop%2Cserver) and [Docker Compose](https://docs.docker.com/compose/install/)

## Backend
To build and start the backend run `make debug-containers`.

## Debugging
You can debug the API container using the Crome DevTools by going to `chrome://inspect`.  
To debug the API in Visual Studio Code, use the launch configuration "Debug API" after starting the container to attach the debugger. This will restart the process.

## API
The API documentation is contained in the file `/docs/api.yaml` can be viewed [here](https://editor.swagger.io/?url=https://raw.githubusercontent.com/StudieverenigingSTORM/StoKa-TV/main/docs/api.yaml).

## Content
The backend should mount a directory containing the content that should be served by the application (see `/compose.yaml`).  
Content can be synchronized to this directory from cloud storage using [rclone](https://rclone.org/).

Each subdirectory within this directory is treated as an arrangement that can be played in the application.
Directories starting with `.` are "hidden" (e.g. for review) and are not listed in the API, but can still be accessed if the name of the directory is known.

By default, all JPEG, PNG and MP4 files are played in alphabetical order.
An explicit order can be defined by creating `arrangement.yaml` in this directory which defines the title of the arrangement and the order and duration of the content.  
Example:
```yaml
# Lines starting with # are comments and are ignored
# Please make sure to produce a valid YAML file (see https://yaml.org/)
# Mind special characters and indentation!

# Title of the arrangement that may be displayed
title: "Main"
items: # List of 
- file: bunny.mp4
  # Optional duration in seconds
  duration: 10
- file: pic1.jpg
  # If duration is not present, the default duration is used
  # (Video length for videos and 5 seconds for images)
```

Place an image with the name `borrel-menu` into the root of the content directory to use as the borrel menu.

To get started, copy `/media.example/` to `/media/`.  
(⚠ This content is not licensed under the same license as the code.)
