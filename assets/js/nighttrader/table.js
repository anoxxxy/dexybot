/*!
* ych SPA exchange
*
* Copyright Lynxline LLC, yshurik, 2019-2023,
* Common Clause license https://commonsclause.com/
*/

$( function() {

console.log("Init table");

ych.gui.table_init = function(id, cols, rows) {
  let named = false;
  let nrows = 0;
  if (Array.isArray(rows)) {
    nrows = rows.length;
    named = true;
  } else {
    nrows = rows || ych.gui.pagesize;
  }
  let table = document.getElementById(id);
  for(let i=0; i<nrows; i++) {
    let rowid = ""+i;
    if (named) rowid = rows[i];
    let have_row = document.getElementById(id+'-'+rowid+'-'+cols[0]);
    if (have_row) continue;
    let row = document.createElement('div');
    row.setAttribute('class', 'ytable-row');
    row.setAttribute('id', id+'-'+rowid);
    cols.forEach(function(col, idx) {
      let cell = document.createElement('div');
      let txt = document.createTextNode('\u00A0');
      cell.appendChild(txt);
      if (col.endsWith('-R'))
        cell.setAttribute('class', 'ytable-cell-r');
      else if (col.endsWith('-C'))
        cell.setAttribute('class', 'ytable-cell-c');
      else if (col.endsWith('-L'))
        cell.setAttribute('class', 'ytable-cell-l');
      else
        cell.setAttribute('class', 'ytable-cell');
      if (rowid.endsWith('-B'))
        cell.setAttribute('class', 'ytable-cell-b');
      cell.setAttribute('id', id+'-'+rowid+'-'+col);
      row.appendChild(cell);
    });
    table.appendChild(row);
  }
  ych.gui.tables[id] = {};
  ych.gui.tables[id].id = id;
  ych.gui.tables[id].cols = cols;
  ych.gui.tables[id].rows = rows;
  ych.gui.tables[id].size = nrows;
};

ych.gui.table_resize = function(id, nrows) {
  let size = ych.gui.tables[id].size;
  if (nrows > size) ych.gui.table_expand(id, nrows);
  if (nrows < size) ych.gui.table_shrink(id, nrows);
};

ych.gui.table_shrink = function(id, nrows) {
  let size = ych.gui.tables[id].size;
  let rows = ych.gui.tables[id].rows;
  let table = document.getElementById(id);
  let named = Array.isArray(rows);
  for(let i=size-1; i>=nrows; i--) {
    let rowid = ""+i;
    if (named) rowid = rows[i];
    let row = document.getElementById(id+'-'+rowid);
    table.removeChild(row);
  }
  if (nrows < size) {
    ych.gui.tables[id].size = nrows;
  }
};

ych.gui.table_expand = function(id, nrows) {
  let size = ych.gui.tables[id].size;
  let cols = ych.gui.tables[id].cols;
  let table = document.getElementById(id);
  for(let i=size; i<nrows; i++) {
    let row = document.createElement('div');
    row.setAttribute('class', 'ytable-row');
    row.setAttribute('id', id+'-'+i);
    cols.forEach(function(col, idx) {
      let cell = document.createElement('div');
      let txt = document.createTextNode('\u00A0');
      cell.appendChild(txt);
      if (col.endsWith('-R'))
        cell.setAttribute('class', 'ytable-cell-r');
      else if (col.endsWith('-C'))
        cell.setAttribute('class', 'ytable-cell-c');
      else if (col.endsWith('-L'))
        cell.setAttribute('class', 'ytable-cell-l');
      else
        cell.setAttribute('class', 'ytable-cell');
      cell.setAttribute('id', id+'-'+i+'-'+col);
      row.appendChild(cell);
    });
    table.appendChild(row);
  }
  if (nrows > size) {
    ych.gui.tables[id].size = nrows;
  }
};

ych.gui.table_clear = function(id) {
  let size = ych.gui.tables[id].size;
  let cols = ych.gui.tables[id].cols;
  let rows = ych.gui.tables[id].rows;
  let named = Array.isArray(rows);
  for(let i=0; i<size; i++) {
    let rowid = ""+i;
    if (named) rowid = rows[i];
    cols.forEach(function(col, idx) {
      let cell = document.getElementById(id+'-'+rowid+'-'+col);
      cell.innerText = '\u00A0';
    });
  }
};

ych.gui.table_col_show = function(id, col, show) {
  if (show == null) {
    show = true;
  }
  if (!show) {
    ych.gui.table_col_hide(id, col);
    return;
  }
  let size = ych.gui.tables[id].size;
  let rows = ych.gui.tables[id].rows;
  let named = Array.isArray(rows);
  $( '#'+id+'-head-'+col ).show();
  for(let i=0; i<size; i++) {
    let rowid = ""+i;
    if (named) rowid = rows[i];
    $( '#'+id+'-'+rowid+'-'+col ).show();
  }
};

ych.gui.table_col_hide = function(id, col) {
  let size = ych.gui.tables[id].size;
  let rows = ych.gui.tables[id].rows;
  let named = Array.isArray(rows);
  $( '#'+id+'-head-'+col ).hide();
  for(let i=0; i<size; i++) {
    let rowid = ""+i;
    if (named) rowid = rows[i];
    $( '#'+id+'-'+rowid+'-'+col ).hide();
  }
};

ych.gui.table_row_clear = function(id, row) {
  let cols = ych.gui.tables[id].cols;
  cols.forEach(function(col, idx) {
    $( '#'+id+'-'+row+'-'+col ).text('\u00A0');
  });
};

ych.gui.table_row_add_class = function(id, row, cls) {
  let cols = ych.gui.tables[id].cols;
  cols.forEach(function(col, idx) {
    $( '#'+id+'-'+row+'-'+col ).addClass(cls);
  });
};

ych.gui.table_row_remove_class = function(id, row, cls) {
  let cols = ych.gui.tables[id].cols;
  cols.forEach(function(col, idx) {
    $( '#'+id+'-'+row+'-'+col ).removeClass(cls);
  });
};

ych.gui.table_insert_custom_row = function(id, idx, name) {
  let table = document.getElementById(id);
  let size = ych.gui.tables[id].size;
  let cols = ych.gui.tables[id].cols;
  let row = document.createElement('div');
  row.setAttribute('class', 'ytable-row');
  row.setAttribute('id', id+'-'+name);
  cols.forEach(function(col, idx) {
    let cell = document.createElement('div');
    let txt = document.createTextNode('\u00A0');
    cell.appendChild(txt);
    if (col.endsWith('-R'))
      cell.setAttribute('class', 'ytable-cell-r');
    else if (col.endsWith('-C'))
      cell.setAttribute('class', 'ytable-cell-c');
    else if (col.endsWith('-L'))
      cell.setAttribute('class', 'ytable-cell-l');
    else
      cell.setAttribute('class', 'ytable-cell');
    cell.setAttribute('id', id+'-'+name+'-'+col);
    row.appendChild(cell);
  });
  // insert at position idx
  let cn_idx = 0;
  let row_idx = 0;
  let before_row_idx = 0;
  let cn = table.childNodes;
  for (i = 0; i < cn.length; i++) {
    let n = cn[i];
    if ('classList' in n &&
        n.classList.length >0 &&
        n.classList[0] == "ytable-row") {
      row_idx++;
      before_row_idx++;
      if (before_row_idx >idx) {
        cn_idx = i;
        break;
      }
    }
  }
  table.insertBefore(row, cn[cn_idx]);
};

});
