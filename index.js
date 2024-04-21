const fs = require('fs');
const xlsx = require('xlsx');
const excelFilePath = './Data.xlsx';
const workbook = xlsx.readFile(excelFilePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(worksheet);
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });
const indexName = 'test';//này để tên index của mọi người nha
async function addDatatoElasticsearch(data) {
    data.forEach(async (row) => {
        try {
            await client.index(
                {
                    index: indexName,
                    body: row
                }
            )
            console.log('Đã thêm dữ liệu vào Elasticsearch:', row);

        } catch (error) {
            console.log('Bị lỗi khi thêm vào elasticsearch:', error);
        }
    });

}

addDatatoElasticsearch(data);