<table class="table" style="margin-top: 10px">
    <thead>
    <tr>
        <th>Title</th>
        <th>Last Updated</th>
        <th>Summary</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>FTP package</td>
        <td>February 7, 2024</td>
        <td>Detailed description of the API of the FTP package.</td>
    </tr>
    </tbody>
</table>

# Overview

# Javascript API

## HTTP requests
You can make `UploadFile` requests to ftp like this:
```javascript
var response = pkg.ftp.functions.uploadFile("inputs", "653fabef32eb821aef");
```

Please take a look at the documentation of the [FTP service](https://github.com/slingr-stack/ftp-service)
for more information about generic requests.

## Dependencies
* FTP Service (v1.0.1)

## About SLINGR

SLINGR is a low-code rapid application development platform that accelerates development, with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

## License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
