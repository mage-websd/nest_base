import * as fs from 'fs';
import * as util from 'util';
import * as moment from "moment";
import config from '../config';

var logStdout = process.stdout;
function logConsole(d) {
  logStdout.write(util.format(d) + '\n');
}

async function logFile(d, file) {
  await file.write(new Date().toISOString() + ': ' + util.format(d) + '\n');
}

function openFile(fileName) {
  return fs.createWriteStream(`${config.basedir}logs/${moment().format('YYYYMMDD')}_${fileName}.log`, {flags : 'a'});
}

export async function logInfo(d) {
  await logFile(d, openFile('info'));
}

export async function logError(d) {
  await logFile(d, openFile('error'));
}

export async function logInfoConsole(d) {
  await logFile(d, openFile('info'));
  logConsole(d);
}

export async function logErrorConsole(d) {
  await logFile(d, openFile('error'));
  logConsole(d);
}
