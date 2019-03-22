'use strict'

const path = require('path')

/**
 * @typedef {object} OptionDefinition
 * @property {string} type - Needs to be 'string' or 'boolean'
 * @property {string|boolean} default - The default value
 * @property {string} [description] - Used as description for cli prompts
 * @property {string} [prompt] - Used when prompting the user via cli
 * @property {string[]} [choices] - If you want to give multiple choices (enum)
 */

/**
 * @typedef {object.<string, OptionDefinition>} OptionDefinitions
 */

/**
 * @param {object} meta
 * @param {string} meta.directory - The absolute path to the directory the
 *   template will be run in
 * @return {OptionDefinitions}
 */
exports.options = ({ directory }) => ({
  name: {
    type: 'string',
    description: 'Name of the gameplan',
    default: path.basename(directory)
  },
  description: {
    type: 'string',
    description: 'Description of the gameplan',
    default: ''
  }
})

/**
 * @param {object} data
 * You'll want to change data.options to match what you have in your
 * @param {{ name: string }} data.options - The resolved options as defined from above
 * @param {object} data.operations
 * @param {(fromPath: string|string[], toPath: string|string[]) => void} data.operations.copy -
 *   Copy a file from fromPath (a relative path from the root of this repo) to
 *   toPath (a relative path from the root of the destination directory)
 * @param {(fromPath: string|string[], toPath: string|string[], variables: object) => void} data.operations.template -
 *   Copy a file from fromPath (a relative path from the root of this repo) to
 *   toPath (a relative path from the root of the destination directory) and
 *   replace expressions in the file "{{variableName}}" with values present in
 *   the variables argument
 * @param {(object: object, toPath: string|string[]) => void} data.operations.json -
 *   Render the raw object to the toPath (A relative path from the root of the
 *   destination directory)
 * @param {(command: string, ...args: string|string[]) => void} data.operations.spawn -
 *   Run the command in a spawned process
 */
exports.run = ({ options, operations }) => {
  const packageJSON = {
    name: options.name,
    version: '0.0.0',
    description: options.description,
    tags: ['gameplan'],
    main: 'index.js'
  }
  operations.json(packageJSON, ['package.json'])
  operations.copy(['templates', 'index.js'], ['index.js'])
  operations.template(['templates', 'README.md'], ['README.md'], {
    name: options.name,
    description: options.description
  })
  operations.copy(
    ['templates', 'templates', 'hello.txt'],
    ['templates', 'hello.txt']
  )
  operations.spawn('git', 'init')
}
