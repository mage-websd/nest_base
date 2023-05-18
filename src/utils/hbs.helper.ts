import * as hbs from 'hbs';
import { STATUS } from '../constants';

export const hbsHelper = () => {
  hbs.registerHelper('ifIn', function (elem: any, list: any[], options: any) {
    if (list.includes(elem)) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  hbs.registerHelper('ifEquals', function (arg1: any, arg2: any) {
    return arg1 === arg2;
  });

  hbs.registerHelper('optionsHtml', function (value: any, objValues: any) {
    let html = '';
    if (!objValues || typeof objValues.lookupProperty === 'function') {
      objValues = STATUS;
    }
    for (const k in objValues) {
      html += `<option value="${objValues[k]}"${value === objValues[k] ? ' selected' : ''}>${k}</option>`
    }
    return html;
  });

  hbs.registerHelper('optionToText', function (value: any, objValues: any) {
    if (!objValues || typeof objValues.lookupProperty === 'function') {
      objValues = STATUS;
    }
    for (const k in objValues) {
      if (value == objValues[k]) {
        return k;
      }
    }
    return '';
  });

  hbs.registerHelper('callFnProperty', function (item: any, fn: string, prop?: string) {
    return item[fn](prop);
  });

  hbs.registerHelper('callPropertyStr', function (item: any, prop: string) {
    return item[prop];
  });

  hbs.registerHelper('callPropertyOptionToText', function (item: any, prop: string, objValues: any) {
    if (!objValues || typeof objValues.lookupProperty === 'function') {
      objValues = STATUS;
    }
    for (const k in objValues) {
      if (item[prop] == objValues[k]) {
        return k;
      }
    }
    return '';
  });

  hbs.registerHelper('renderMenu', function () {
    const menus = [
      {
        title: 'User',
        name: 'user',
        iconFa: 'fa-solid fa-users',
      },
      {
        title: 'Children',
        name: 'child',
        iconFa: 'fa-solid fa-children',
      },
      {
        title: 'Vacxin',
        name: 'vacxin',
        iconFa: 'fa-sharp fa-solid fa-vial-circle-check',
      },
      {
        title: 'Injection Book',
        name: 'injectionbook',
        iconFa: 'fa-solid fa-syringe',
      },
      {
        title: 'Timeline',
        name: 'timeline',
        iconFa: 'fa-solid fa-timeline',
      },
      {
        title: 'Banner',
        name: 'banner',
        iconFa: 'fa-solid fa-panorama',
      },
      {
        title: 'Config',
        name: 'config',
        iconFa: 'fa-solid fa-gear',
      },
      {
        title: 'Notification',
        name: 'notification',
        iconFa: 'fa-solid fa-bell',
      },
    ];
    let html = '';
    menus.forEach(item => {
      html += `
      <li class="nav-item" data-menu-open="${item.name}">
        <a href="#" class="nav-link" data-menu="${item.name}">
          <i class="nav-icon ${item.iconFa}"></i>
          <p>
            ${item.title}
            <i class="right fas fa-angle-left"></i>
          </p>
        </a>
        <ul class="nav nav-treeview">
          <li class="nav-item">
            <a href="/admin/${item.name}" class="nav-link" data-menu="${item.name}-list">
              <i class="nav-icon fa-solid fa-list"></i>
              <p>List</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="/admin/${item.name}/create" class="nav-link" data-menu="${item.name}-add">
              <i class="nav-icon fa-solid fa-plus"></i>
              <p>Create</p>
            </a>
          </li>
        </ul>
      </li>
      `
    });
    return html;
  });
};
