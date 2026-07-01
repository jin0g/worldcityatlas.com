# TODO

## Immediate

- [x] Stop using JavaScript rendering for city body content.
- [x] Convert city pages to ordinary static HTML content.
- [x] Use JavaScript only for shared hierarchical header and simple footer.
- [x] Create Japanese skeleton prose for all currently implemented city pages.
- [x] Generate local placeholder `header.png` / `street.png` style images for all currently implemented cities, preserving Tokyo `street.png`.
- [x] Add hierarchical header navigation by region, country, and city.
- [x] Replace footer with centered `© WORLD CITY ATLAS 2026`.
- [x] Replace one oversized "deep read" block with multiple city-specific sections.
- [x] Improve shared header and footer styling in `common.css`.
- [x] Remove GDP-list-excluded Phnom Penh and Siem Reap pages.
- [x] Remove `common.js`.
- [x] Update `index.html` to the new GDP ranking order.
- [x] Convert all existing city pages to static HTML.
- [ ] Generate AI-only images for Tokyo, inspect candidates, and adopt final `tokyo/header.png` and `tokyo/street.png`.
- [ ] Continue city pages in GDP ranking order.

## Static Page Rules

- [x] Keep city content inside each `city/index.html`.
- [x] Do not add JS-rendered city body data.
- [x] Use major city names in visible labels, not full metropolitan-area labels.
- [x] Add Japanese heading line-break controls and mobile layout adjustments.
- [ ] Use `common.css` for shared styling.
- [ ] Put generated images inside the relevant city directory.
- [ ] Do not use `assets/`.
- [ ] Do not use web-downloaded images.
- [ ] For each generated image set, create candidates and visually inspect before adoption.

## GDP Ranking Implementation Queue

Use the user-supplied GDP ranking order. Slugs are simplified where the listed item is a metropolitan statistical area or region.

- [ ] 001 `new-york` - New York-Newark-Jersey City
- [ ] 002 `tokyo` - Greater Tokyo Area
- [ ] 003 `los-angeles` - Los Angeles-Long Beach-Anaheim
- [ ] 004 `paris` - Paris metropolitan area
- [ ] 005 `chicago` - Chicago-Naperville-Elgin
- [ ] 006 `london` - London
- [ ] 007 `seoul` - Seoul Metropolitan Area
- [ ] 008 `san-francisco` - San Francisco-Oakland-Fremont
- [ ] 009 `shanghai` - Shanghai
- [ ] 010 `houston` - Houston-The Woodlands-Sugar Land
- [ ] 011 `dallas` - Dallas-Fort Worth-Arlington
- [ ] 012 `beijing` - Beijing
- [ ] 013 `washington-dc` - Washington-Arlington-Alexandria
- [ ] 014 `osaka` - Kyoto-Osaka-Kobe
- [ ] 015 `singapore` - Singapore
- [ ] 016 `rhine-ruhr` - Rhine-Ruhr metropolitan region
- [ ] 017 `boston` - Boston-Cambridge-Newton
- [ ] 018 `atlanta` - Atlanta-Sandy Springs-Roswell
- [ ] 019 `seattle` - Seattle-Tacoma-Bellevue
- [ ] 020 `philadelphia` - Philadelphia-Camden-Wilmington
- [ ] 021 `shenzhen` - Shenzhen
- [ ] 022 `miami` - Miami-Fort Lauderdale-West Palm Beach
- [ ] 023 `moscow` - Moscow metropolitan area
- [ ] 024 `chongqing` - Chongqing
- [ ] 025 `nagoya` - Nagoya
- [ ] 026 `hong-kong` - Hong Kong
- [ ] 027 `san-jose` - San Jose-Sunnyvale-Santa Clara
- [ ] 028 `toronto` - Greater Toronto Area
- [ ] 029 `jakarta` - Jakarta metropolitan area
- [ ] 030 `guangzhou` - Guangzhou
- [ ] 031 `taipei` - Taipei-Keelung metropolitan area
- [ ] 032 `istanbul` - Istanbul metropolitan area
- [ ] 033 `phoenix` - Phoenix-Mesa-Scottsdale
- [ ] 034 `sydney` - Sydney
- [ ] 035 `munich` - Munich Metropolitan Region
- [ ] 036 `suzhou` - Suzhou
- [ ] 037 `minneapolis` - Minneapolis-St. Paul-Bloomington
- [ ] 038 `mumbai` - Mumbai
- [ ] 039 `bengaluru` - Bengaluru
- [ ] 040 `delhi` - National Capital Region (Delhi)
- [ ] 041 `detroit` - Detroit-Warren-Dearborn
- [ ] 042 `mexico-city` - Greater Mexico City
- [ ] 043 `central-german` - Central German Metropolitan Region
- [ ] 044 `san-diego` - San Diego-Carlsbad
- [ ] 045 `denver` - Denver-Aurora-Lakewood
- [ ] 046 `berlin` - Berlin/Brandenburg Metropolitan Region
- [ ] 047 `chengdu` - Chengdu
- [ ] 048 `sao-paulo` - Greater Sao Paulo
- [ ] 049 `melbourne` - Melbourne
- [ ] 050 `stuttgart` - Stuttgart Metropolitan Region
- [ ] 051 `tel-aviv` - Tel Aviv metropolitan area
- [ ] 052 `frankfurt` - Frankfurt Rhine-Main
- [ ] 053 `hangzhou` - Hangzhou
- [ ] 054 `wuhan` - Wuhan
- [ ] 055 `hamburg` - Hamburg Metropolitan Region
- [ ] 056 `dhaka` - Dhaka
- [ ] 057 `madrid` - Madrid Metropolitan Area
- [ ] 058 `charlotte` - Charlotte-Concord-Gastonia
- [ ] 059 `baltimore` - Baltimore-Columbia-Towson
- [ ] 060 `manila` - Mega Manila
- [ ] 061 `riverside` - Riverside-San Bernardino-Ontario
- [ ] 062 `dublin` - Greater Dublin Area
- [ ] 063 `milan` - Milan metropolitan area
- [ ] 064 `austin` - Austin-Round Rock
- [ ] 065 `riyadh` - Riyadh
- [ ] 066 `tampa` - Tampa-St. Petersburg-Clearwater
- [ ] 067 `nanjing` - Nanjing
- [ ] 068 `ningbo` - Ningbo
- [ ] 069 `tianjin` - Tianjin
- [ ] 070 `busan` - Busan-Gyeongnam Area
- [ ] 071 `bangkok` - Bangkok Metropolitan Region
- [ ] 072 `birmingham-west-midlands` - Birmingham (West Midlands)
- [ ] 073 `rome` - Rome metropolitan area
- [ ] 074 `st-louis` - St. Louis
- [ ] 075 `buenos-aires` - Greater Buenos Aires
- [ ] 076 `qingdao` - Qingdao
- [ ] 077 `orlando` - Orlando-Kissimmee-Sanford
- [ ] 078 `wuxi` - Wuxi
- [ ] 079 `barcelona` - Barcelona metropolitan area
- [ ] 080 `portland` - Portland-Vancouver-Hillsboro
- [ ] 081 `nashville` - Nashville-Davidson-Murfreesboro-Franklin
- [ ] 082 `kolkata` - Kolkata
- [ ] 083 `chennai` - Chennai
- [ ] 084 `amsterdam` - Amsterdam metropolitan area
- [ ] 085 `zurich` - Zurich Metropolitan Area
- [ ] 086 `montreal` - Greater Montreal
- [ ] 087 `changsha` - Changsha
- [ ] 088 `brussels` - Brussels metropolitan area
- [ ] 089 `zhengzhou` - Zhengzhou
- [ ] 090 `stockholm` - Stockholm metropolitan area
- [ ] 091 `fuzhou` - Fuzhou
- [ ] 092 `indianapolis` - Indianapolis-Carmel-Anderson
- [ ] 093 `hanover-region` - Hanover-Braunschweig-Gottingen-Wolfsburg Metropolitan Region
- [ ] 094 `cincinnati` - Cincinnati
- [ ] 095 `pittsburgh` - Pittsburgh
- [ ] 096 `ruhr` - Ruhr
- [ ] 097 `dubai` - Dubai-Sharjah-Ajman metropolitan area
- [ ] 098 `jinan` - Jinan
- [ ] 099 `hefei` - Hefei
- [ ] 100 `sacramento` - Sacramento-Roseville-Arden-Arcade

## Later Ranking Items To Continue

Continue after item 100 in the same order from the user-provided GDP list, starting with Copenhagen, Foshan, Xi'an, Kansas City, Quanzhou, Fukuoka-Kitakyushu, San Antonio, Columbus, Las Vegas, Brisbane, Nuremberg, Nantong, Cleveland, Dongguan, Rio de Janeiro, Vienna, Lisbon, Kuala Lumpur, Vancouver, Changzhou, Yantai, Aix-Marseille-Provence, Salt Lake City, Ankara, Tangshan, Monterrey, Jeddah, Manchester, Metropolitan Cork, Wenzhou, Ahmedabad, Johannesburg, Xuzhou, Dalian, Raleigh, Milwaukee, Jacksonville, Santiago, Saint Petersburg, Virginia Beach, Shenyang, Northwest Metropolitan Region, Hartford, Bogota, Xiamen, Kuwait City, Warsaw, Shaoxing, Helsinki, Rhine-Neckar, Richmond, Bridgeport, Prague, Lyon, Lima, Rotterdam, Providence, Perth, Yangzhou, Nanchang, Yancheng, Jiaxing, Karachi, Baghdad, Yulin, Abu Dhabi, Gothenburg, Cairo, Auckland, Memphis, New Orleans, Lagos, Lille, Oklahoma City, Calgary, Taizhou, Utrecht, Louisville, Athens, Kunming, Ho Chi Minh City, Changchun, Harbin, Taizhou Zhejiang, Bern, Omaha, Buffalo, Turin, Ordos, Surabaya, Katowice-Ostrava, Yichang, Budapest, Huizhou, Izmir, Xiangyang, Zhangzhou, Albany, Sapporo, and Birmingham-Hoover.
