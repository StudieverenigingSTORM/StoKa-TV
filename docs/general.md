# General documentation
This document contains general documentation, such as diagrams, about this project.

## System overview
Concept for the deployment of the different components of the solution. (Different deployments may be possible)

![System overview](./system_overview.drawio.svg)

## TV application
The TV application constitutes the public part of the solution.
It has limited interactivity.
Content cannot be authored through this application.
This application is also available in the browser to preview7review the content.

![Flowchart TV application](./flow_tv.drawio.svg)

## Content Management System (CMS)
The content management system is a private application for authorized users only. It is used to author (**C**reate/**R**ead/**U**pdate/**D**elete) the content that is displayed in the TV application.

![Use-case Content Management System application](./use-case_cms.drawio.svg)
