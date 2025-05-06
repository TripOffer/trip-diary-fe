import axios from 'axios';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import fs from 'fs';

const TXT_URL = 'https://apifox.com/apidoc/shared/3cc8c915-b9d0-46d2-b78f-92f0f2a00e48/llms.txt';
const MD_DIR = './scripts/api-md';

function getEnglishName(title, link) {
  // 优先取 title 的英文部分，否则取链接最后一段
  const match = title.match(/^([A-Za-z0-9]+)/);
  if (match) return match[1];
  const linkName = link.split('/').pop().replace('.md', '');
  return linkName;
}

async function main() {
  const { data } = await axios.get(TXT_URL);
  const lines = data.split('\n');
  const apis = [];
  const linkRegex =
    /^-\s*(.*?)\[([^\[\]]+)\]\((https:\/\/apifox\.com\/apidoc\/shared\/[^\)]+)\):?\s*(.*)$/;
  const filenameCount = {};

  for (const line of lines) {
    const match = line.match(linkRegex);
    if (match) {
      let [, group, title, link, desc] = match;
      group = group.trim();
      title = title.trim();
      link = link.trim();
      desc = desc.trim();
      let englishName = getEnglishName(title, link);
      // 避免同名覆盖
      filenameCount[englishName] = (filenameCount[englishName] || 0) + 1;
      const filename =
        filenameCount[englishName] > 1
          ? `${String(apis.length + 1).padStart(2, '0')}-${englishName}_${filenameCount[englishName]}.md`
          : `${String(apis.length + 1).padStart(2, '0')}-${englishName}.md`;
      apis.push({ group, title, link, desc, filename });
    }
  }

  // 写入 apis.json
  await writeFile('./scripts/apis.json', JSON.stringify(apis, null, 2), 'utf-8');
  console.log('已写入 ./scripts/apis.json');

  // 创建 api-md 目录
  if (!fs.existsSync(MD_DIR)) {
    await mkdir(MD_DIR, { recursive: true });
  }

  // 下载 README 并替换为本地链接
  let readme = data;
  for (const api of apis) {
    readme = readme.replaceAll(api.link, api.filename);
  }
  await writeFile(path.join(MD_DIR, 'README.md'), readme, 'utf-8');
  console.log('已保存: README.md');

  // 下载每个 markdown
  for (let i = 0; i < apis.length; i++) {
    const api = apis[i];
    try {
      const res = await axios.get(api.link);
      await writeFile(path.join(MD_DIR, api.filename), res.data, 'utf-8');
      console.log(`已保存: ${api.filename}`);
    } catch (e) {
      console.error(`下载失败: ${api.link}`);
    }
  }
}

main();
