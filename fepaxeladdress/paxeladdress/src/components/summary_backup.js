import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import axios from 'axios';
import {
  Box, Button,

  IconButton,

  Tooltip,
} from '@mui/material';
import { Delete,Edit } from '@mui/icons-material'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import { ExportToCsv } from 'export-to-csv';
import { Header } from './header';
import { Footer } from './footer';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';



// import { Row } from 'jspdf-autotable';
const Summary = () => {
  const doc = new jsPDF();
  //should be memoized or stable

  const [data, setData] = useState([]);
  const [content, setcontent] = useState([])
  useEffect(() => loadUserData(), []);

  const loadUserData = () => {
    axios
      .get("https://addressmanager-api.mannit.co/address")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: 'fullname', //access nested data with dot notation
        header: 'Full Name',
      },
      {
        accessorKey: 'address1',
        header: 'Address1',
      },
      {
        accessorKey: 'address2', //normal accessorKey
        header: 'Address2',
      },
      {
        accessorKey: 'city',
        header: 'City',
        
      },
      {
        accessorKey: 'region',
        header: 'State',
      },
      {
        accessorKey: 'zipcode',
        header: 'Zip',
      },
      {
        accessorKey: 'country',
        header: 'Country',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
      {
        accessorKey: 'group',
        header: 'Group',
      },
    ],
    [],
  );

const BOX_WIDTH = 63;
const BOX_HEIGHT = 32;
const BOX_MARGIN = 2.4;

const drawBox = (doc, x, y, tcontent) => {
  doc.rect(x, y, BOX_WIDTH, BOX_HEIGHT);
  doc.setFontSize(8);
  doc.text(tcontent, x + 2, y + 5, {
    align: 'left',
  });
};

const drawBoxes = (doc) => {
  const PAGE_WIDTH = doc.internal.pageSize.width;
  const BOXES_PER_ROW = 3;
  const BOXES_PER_PAGE = content.length;
  const TOP_MARGIN = 14;
  let row = 0;
  let col = 0;
  for (let i = 0; i < BOXES_PER_PAGE; i++) {
    if (i % 24 === 0 && i !== 0) {
      doc.addPage();
      row = 0;
      col = 0;
      const x = (PAGE_WIDTH - (BOX_WIDTH * BOXES_PER_ROW + BOX_MARGIN * (BOXES_PER_ROW - 1))) / 2 + row * (BOX_WIDTH + BOX_MARGIN);
      const y = TOP_MARGIN + col * (BOX_HEIGHT + BOX_MARGIN);
      drawBox(doc, x, y, content[i]);
      row++;
    } else {
      const x = (PAGE_WIDTH - (BOX_WIDTH * BOXES_PER_ROW + BOX_MARGIN * (BOXES_PER_ROW - 1))) / 2 + row * (BOX_WIDTH + BOX_MARGIN);
      const y = TOP_MARGIN + col * (BOX_HEIGHT + BOX_MARGIN);
      drawBox(doc, x, y, content[i]);
      row++;
      if (row === BOXES_PER_ROW) {
        row = 0;
        col++;
      }
    }
  }
};



  const handleExportRows = (rows) => {
    rows.map((row) => content.push([row.original.pre + ". " + row.original.fullname.trim(), row.original.address1.trim(), row.original.address2, row.original.city, row.original.region, row.original.zipcode, row.original.country, "(Ph :) " + row.original.phone +"  (Ph :) "+ row.original.phone1]))
    drawBoxes(doc);
    doc.save("address.pdf");
    console.log(content);
    setcontent([]);
  };

  const handleSaveRowEdits = ({ exitEditingMode, row, values }) => {
    axios
      .patch(`https://addressmanager-api.mannit.co/address/${row.original.id}`,  values )
      .then(() => {
        loadUserData();
        exitEditingMode();
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteRow = useCallback(
    (row) => {
      // Show confirmation message using confirm dialog
      const result = window.confirm(`Are you sure you want to delete ${row.original.fullname}?`);
      // User confirmed deletion
      if (result) {
        axios
          .delete(`https://addressmanager-api.mannit.co/address/${row.original.id}`)
          .then((response) => {
            // Reload table data after successful deletion
            loadUserData();
          })
          .catch((err) => console.log(err));
      }
    },
    []
  );

  return (
    <div>

      <Header />
      <div className='lg:w-[1090px] xl:w-full flex pt-24  flex-col  items-center justify-center gap-12'>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableEditing
          enableRowSelection
          onEditingRowSave={handleSaveRowEdits}
          initialState={{ pagination: { pageSize: 5 } }}
          defaultColumn={{
            minSize: 20, //allow columns to get smaller than default
            maxSize: 50, //allow columns to get larger than default
            size: 260, //make columns wider by default
          }}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap', }}
            >
              <Button
                disabled={table.getRowModel().rows.length === 0}
                //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                onClick={() => handleExportRows(table.getRowModel().rows)}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export Page Rows
              </Button>
              <Button
                disabled={
                  !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                }
                //only export selected rows
                onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export Selected Rows
              </Button>
            </Box>
          )}
        />

      </div>
      <Footer />
    </div>
  );
};
export default Summary;

