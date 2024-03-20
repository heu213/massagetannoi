import XlsxPopulate from 'xlsx-populate';
import loggerHelper from '@utils/logger.util';
import { FORMAT_NUMBER_COLUNM } from './constant';
const logger = loggerHelper.getLogger('service.controller');
import express from 'express';
const ExcelFactory = {
  createWorkbook: async () => {
    return XlsxPopulate.fromBlankAsync();
  },

  createExcelBuffer: async (workbook:any) => {
    return workbook.outputAsync();
  },
};

const generateExcelSheet = (sheet:any, dataExcel:any) => {
  const headerRow = sheet.row(1);
  const numberColumns = FORMAT_NUMBER_COLUNM
  Object.keys(dataExcel[0]).forEach((cellKey, columnIndex) => {
    headerRow.cell(columnIndex + 1).value(cellKey).style({ bold: true });
  });
  dataExcel.forEach((row:any, rowIndex:any) => {
    Object.entries(row).forEach(([cellKey, cellValue]) => {
      const columnIndex = Object.keys(dataExcel[0]).indexOf(cellKey);
      const cell = sheet.cell(rowIndex + 2, columnIndex + 1);
      if (numberColumns.includes(cellKey)) {
        cell.value(Number(cellValue)).style('numberFormat', '#,##0');
      } else {
        cell.value(cellValue);
      }
    });
  });
};

const generateExcelBuffer = async (resultExport:any) => {
  const workbook = await ExcelFactory.createWorkbook();
  const sheet = workbook.sheet(0);
  const { dataExcel, fileName } = resultExport;

  if (dataExcel && dataExcel.length > 0) {
    generateExcelSheet(sheet, dataExcel);
  }
  return ExcelFactory.createExcelBuffer(workbook);
};

const ExportHeader = async (res: express.Response) => {
  try {
    const currentDate = new Date();
    const fileNameWithExtension = `Export_${currentDate.toISOString()}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${fileNameWithExtension}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export default {
  generateExcelBuffer,
  ExportHeader
};