import yargs from 'yargs';
import writeFixture from './writeFixture.js';

yargs(process.argv.slice(2))
  .usage(
    '$0 <project> [output]',
    'build a fixture',
    (yargs) => {
      return yargs
        .option('filter', {
          describe: 'filter package to structural keys',
          type: 'boolean',
          default: true,
        })
        .positional('project', {
          describe: 'the project directory',
          type: 'string',
          demandOption: true,
        })
        .positional('output', {
          describe: 'the directory or file to output to',
          type: 'string',
          default: '.',
        });
    },
    ({ project, output, filter }) => {
      writeFixture(project, { output, filter });
    }
  )
  .help().argv;
