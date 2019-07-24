import path from 'path';
import fs from 'fs';
import moment from 'moment';
import { version } from '../src/defaultSettings';

const CurrentVersion = `${version}.${moment().format("YYMMDD.HHmmss")}`;

const setPackageJsonVersion = () =>{
  const pkgPath = path.join(__dirname, '/../package.json');
  let pkg = fs.readFileSync(pkgPath);
  pkg = JSON.parse(pkg);
  pkg.version = CurrentVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

export default config => {
  config.plugin('define').tap( args => {
    if(process.env.NODE_ENV !== 'development'){
      setPackageJsonVersion();
      args[0].VERSION = JSON.stringify(CurrentVersion);   // 方式1：直接访问VERSION
      args[0]['process.env.VERSION'] = JSON.stringify(CurrentVersion);    // 方式2：通过process.env.VERSION访问
    }else{
      args[0].VERSION = JSON.stringify(version);
      args[0]['process.env.VERSION'] = JSON.stringify(version);
    }
    return args;
  })
}