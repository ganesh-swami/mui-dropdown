
const perPage=60;
let page=1;
const totle = 2626;



function fetchData(page){
    return new Promise((resolve,reject)=>{
        const body = {"page":page,"limit":perPage,"nextResult":{}};
        const resp = fetch("https://lasvegasaug.fashionresource.com/api/v1/search/exhibitors", {
            "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-application": "3",
            "x-fp": "4aaa406ad1295b3e7753998066ff17fe",
            "x-lang": "en",
            "x-real-origin": "/marketplace/exhibitors?pageNumber=1&limit=12",
            "x-real-refer": "/marketplace/exhibitors?pageNumber=1&limit=2",
            "cookie": "fingerprint={%22hash%22:%224aaa406ad1295b3e7753998066ff17fe%22%2C%22expire%22:1723604256422}; token=; PHPSESSID=q3v1dolt9cfllu1li1luapa24u; lang=en; initiated=true; _gcl_au=1.1.2062118875.1723604256; _gid=GA1.2.1216117545.1723604256; sa-user-id=s%253A0-cfab846a-1502-5cb0-77d2-37a615f9748f.BWGqgHN5hfzIPHTF15bJ02TbMrzlN%252FD%252BEOG4unDpHM8; sa-user-id-v2=s%253Az6uEahUCXLB30jemFfl0jzErsZI.u23CGrXQt5CwcC9IRhKgdXfMa7mXnuJ%252Fat0Y6SVt8ho; sa-user-id-v3=s%253AAQAKICcQRQvGJdnSngO8Dh18Q0ZHceCat-_003a9CMgJAXpMEAEYAyCunPOzBjABOgRpr-VwQgQu4m5N.hAp1sRXI9fuf2GsoWFJNrKOmgve92bb%252BVlLGqtk7tMY; __adroll_fpc=deee4ef15b756db4877e42a567f063f8-1723604258131; _fbp=fb.1.1723604259426.73751468537621150; _ga_78CKLYWFJK=GS1.1.1723604319.1.1.1723604385.60.0.0; _ga=GA1.2.1954597314.1723604256; _gat_UA-151022319-1=1; _gat_UA-151022319-2=1; _gat_UA-151022319-9=1; _gat_UA-151022319-3=1; _gat_UA-151022319-5=1; _ga_D5DTKS92FY=GS1.1.1723604256.1.1.1723604402.43.0.0; _uetsid=f747b75059e811efa0a0316cbcbd6316; _uetvid=f747dcf059e811ef828e351ea57b38af; _ga_Z1MXMM07MD=GS1.2.1723604258.1.1.1723604402.60.0.0; _ga_8Q8SRD3TS6=GS1.2.1723604258.1.1.1723604402.60.0.0; _ga_ZW14YV410F=GS1.2.1723604258.1.1.1723604402.60.0.0; _ga_9H00DCKH9D=GS1.2.1723604259.1.1.1723604403.60.0.0; _ga_YECTYL1G2H=GS1.2.1723604258.1.1.1723604403.60.0.0; __ar_v4=TEMSL5ZVCRCB7K5U2JRDTT%3A20240813%3A4%7CBDKZPM66SZFIRNQYXFOZLE%3A20240813%3A4%7CWWOS4ICHXVGNLFD5AEV4WY%3A20240813%3A4",
            "Referer": "https://lasvegasaug.fashionresource.com/newfront/marketplace/exhibitors?pageNumber=1&limit=12",
            "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": body,
            "method": "POST"
        });

        resp.then((response) => response.text()).then((body)=>{
            // console.log(body)
            resolve(body);
        }).catch((error) => {
            console.error(error);
        });
    })
}

fetchData(page).then((data)=>{
    console.log(data)
    if(data.data.list){
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].name);
        }
    }
})