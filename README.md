# react-json-fast-forms
[![npm](https://img.shields.io/npm/v/react-json-fast-forms)](https://www.npmjs.com/package/react-hooks-worker)
[![size](https://img.shields.io/bundlephobia/minzip/react-json-fast-forms)](https://bundlephobia.com/result?p=react-json-fast-forms)
[![NPM Monthly Downloads](https://img.shields.io/npm/dm/snowflake-id.svg)](https://npmjs.com/react-json-fast-forms)

![react-json-fast-forms](media/react-json-fast-forms.png)

React fast and dynamic form constructor.

## Introduction

🚀 This library is a comprehensive solution for creating dynamic forms based on the described structure.

👌 The design is implemented on top of antd, but there are plans to implement UI adapters to fine-tune the display.

## Install

```bash
npm install react-json-fast-forms
```
```bash
yarn add react-json-fast-forms
```

## Usage

🔧 At work...

## Component scheme props

| Property                  | Type        | Description                                                        | Supported components   | Required? | 
|---------------------------|-------------|--------------------------------------------------------------------|------------------------|:---------:|
| `id`                      | String      | The unique identifier of the component                             | ***                    |     ✓     |
| `valueName`               | String      | The designation of the reference to the state property of the form | *Form Item*            |           |
| `label`                   | String      | The displayed description of the component                         | *Form Item*            |           |
| `components`              | Array       | List of child components                                           | Group, Dynamic List    |           |
| `layout`                  | Object      | Layout settings                                                    | Group                  |           |
| `readonly`                | Boolean     | Read-only attribute                                                | *Form Item*            |           |
| `content`                 | String      | Component content                                                  | HTML                   |           |
| `alt`                     | String      | Image description                                                  | Image                  |           |
| `source`                  | String      | Link to the resource                                               | Image                  |           |
| `text`                    | String      | The content of the text, including MD                              | Text                   |           |
| `values`                  | Array       | List of values                                                     | Select, Radio          |           |
| `path`                    | String      | The path to the form property                                      | Dynamic List           |           |
| `defaultRepetitions`      | Number      | The number of displayed items                                      | Dynamic List           |           |
| `placeholder`             | String      | Component placeholder                                              | Select                 |           |
| `allowAddRemove`          | Boolean     | Support for changes                                                | Dynamic List, Tag List |           |
| `validate`                | Object      | Validation rules                                                   | *Form Item*            |           |
| `defaultValue`            | String      | The default value                                                  | Select                 |           |
| `type`                    | String      | Type of component                                                  | ***                    |     ✓     |

#### Examples

The [examples](examples) folder contains working examples.
You can run one of them with.