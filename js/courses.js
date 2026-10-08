
const TRACKS = [
  {id:'tech',    code:'TC', name:'Code & Tech',       hi:'टेक',      dest:'Tech job'},
  {id:'trade',   code:'TR', name:'Trades & Skills',   hi:'हुनर',     dest:'Skilled trade'},
  {id:'degree',  code:'DG', name:'Degrees & School',  hi:'डिग्री',   dest:'Degree'},
  {id:'exams',   code:'EX', name:'Exams & Study',     hi:'परीक्षा',  dest:'Exam ready'},
  {id:'biz',     code:'BZ', name:'Business & Money',  hi:'व्यापार',  dest:'Own business'},
  {id:'digital', code:'DL', name:'Digital & English', hi:'डिजिटल',   dest:'Office job'},
];
const STARTS = [
  {id:'s10',  name:'Class 10 or less'},
  {id:'s12',  name:'Class 12'},
  {id:'grad', name:'Graduate / diploma'},
  {id:'work', name:'Working now'},
];
const ALL = ['s10','s12','grad','work'];

const COURSES = [
  
  {t:'tech',k:'Spoken Tutorial',n:'Spoken Tutorial',o:'IIT Bombay · Ministry of Education',u:'https://spoken-tutorial.org/tutorial-search/',s:'gov',c:'free',cn:'Free',cert:false,l:'English, Hindi + many Indian languages',off:false,lv:1,w:ALL,d:'Short screen-recorded lessons on Python, C, LibreOffice, Linux and more, dubbed in Indian languages.'},
  {t:'tech',k:'NIELIT',n:'NIELIT CCC & O Level',o:'NIELIT · MeitY',u:'https://www.nielit.gov.in/content/course-computer-concepts-ccc-0',s:'gov',c:'low',cn:'Low fees',cert:true,l:'English, Hindi',off:true,lv:1,w:ALL,d:'Government computer certificates (CCC, O Level) that many state and central job notices ask for.'},
  {t:'tech',k:'freeCodeCamp',n:'freeCodeCamp Certifications',o:'freeCodeCamp',u:'https://www.freecodecamp.org/learn',s:'pvt',c:'free',cn:'Free',cert:true,l:'English, some Hindi',off:false,lv:1,w:['s12','grad','work'],d:'Learn web development, JavaScript and Python by building projects. Certificates are free.'},
  {t:'tech',k:'Springboard',n:'Infosys Springboard',o:'Infosys',u:'https://infyspringboard.onwingspan.com',s:'pvt',c:'free',cn:'Free',cert:true,l:'English',off:false,lv:1,w:ALL,d:'Free courses from programming basics to cloud and AI, with completion certificates.'},
  {t:'tech',k:'NPTEL',n:'NPTEL Online Courses',o:'IITs & IISc · Ministry of Education',u:'https://nptel.ac.in/courses',s:'gov',c:'cert',cn:'Exam fee for certificate',cert:true,l:'English, some Indian-language subtitles',off:false,lv:2,w:['s12','grad','work'],d:'Full IIT and IISc courses in programming, data science, electronics and engineering.'},
  {t:'tech',k:'CS50',n:'CS50: Introduction to Computer Science',o:'Harvard University',u:'https://cs50.harvard.edu/x/',s:'pvt',c:'free',cn:'Free',cert:true,l:'English',off:false,lv:2,w:['s12','grad','work'],d:'One of the best-known intro programming courses. Free certificate from CS50 when you finish.'},
  {t:'tech',k:'Virtual Labs',n:'Virtual Labs',o:'IIT Delhi & partners · Ministry of Education',u:'https://www.vlab.co.in',s:'gov',c:'free',cn:'Free',cert:false,l:'English',off:false,lv:2,w:['s12','grad'],d:'Run science and engineering lab experiments in your browser when you have no lab access.'},
  {t:'tech',k:'Cisco NetAcad',n:'Cisco Networking Academy',o:'Cisco',u:'https://www.netacad.com/catalogs/learn',s:'pvt',c:'free',cn:'Many courses free',cert:true,l:'English',off:false,lv:2,w:['s12','grad','work'],d:'Self-paced courses in networking, cybersecurity and Python, with badges.'},
  {t:'tech',k:'IIT Madras BS',n:'IIT Madras BS in Data Science',o:'IIT Madras',u:'https://study.iitm.ac.in/ds/',s:'gov',c:'low',cn:'Income-based fee waivers',cert:true,l:'English',off:false,lv:3,w:['s12','grad','work'],d:'An online degree open to anyone who passed Class 12 with Maths. Large fee waivers for low-income families.'},
  {t:'tech',k:'FutureSkills',n:'FutureSkills Prime',o:'MeitY & NASSCOM',u:'https://learn.futureskillsprime.in/iDH/fsp/Catalog/order_by/popular_down/pageNo/1',s:'gov',c:'free',cn:'Many courses free',cert:true,l:'English',off:false,lv:3,w:['grad','work'],d:'Government-backed courses in AI, cloud, cybersecurity and more, with incentives on assessment fees.'},
  {t:'tech',k:'IIRS',n:'ISRO IIRS e-Learning',o:'Indian Institute of Remote Sensing · ISRO',u:'https://elearning.iirs.gov.in/available_courses.php',s:'gov',c:'free',cn:'Free',cert:true,l:'English',off:false,lv:3,w:['grad','work'],d:'Free courses on remote sensing, GIS and satellite data, taught by ISRO scientists.'},
  {t:'tech',k:'Microsoft Learn',n:'Microsoft Learn',o:'Microsoft',u:'https://learn.microsoft.com/en-us/training/browse/',s:'pvt',c:'cert',cn:'Exams cost extra',cert:true,l:'English, Hindi',off:false,lv:3,w:['grad','work'],d:'Free learning paths for Azure, Excel, Power BI and more. Pay only to sit a certification exam.'},
  {t:'tech',k:'AWS',n:'AWS Skill Builder',o:'Amazon Web Services',u:'https://skillbuilder.aws/learn',s:'pvt',c:'cert',cn:'Exams cost extra',cert:true,l:'English',off:false,lv:3,w:['grad','work'],d:'Hundreds of free cloud computing courses. Certification exams are paid.'},

  
  {t:'trade',k:'Skill India Hub',n:'Skill India Digital Hub',o:'Ministry of Skill Development',u:'https://www.skillindiadigital.gov.in/courses',s:'gov',c:'free',cn:'Free',cert:true,l:'English, Hindi + regional',off:false,lv:1,w:ALL,d:'The national skilling portal. Browse free courses and find training centres near you.'},
  {t:'trade',k:'JSS',n:'Jan Shikshan Sansthan',o:'Ministry of Skill Development',u:'https://jss.gov.in',s:'gov',c:'free',cn:'Nominal or no fee',cert:true,l:'Local languages',off:true,lv:1,w:['s10'],d:'Tailoring, beauty, electrical work and more for school dropouts and adults aged 15 to 45.'},
  {t:'trade',k:'PMKVY',n:'Pradhan Mantri Kaushal Vikas Yojana',o:'Ministry of Skill Development',u:'https://www.pmkvyofficial.org/Find-course-of-your-choice',s:'gov',c:'free',cn:'Training free',cert:true,l:'Hindi, English + regional',off:true,lv:2,w:['s10','s12','grad'],d:'Free short-term training at accredited centres, with a government-recognised certificate.'},
  {t:'trade',k:'ITI',n:'Industrial Training Institutes (ITI)',o:'DGT · Ministry of Skill Development',u:'https://dgt.gov.in/en/cts-details',s:'gov',c:'low',cn:'Low fees at govt ITIs',cert:true,l:'Hindi, English + regional',off:true,lv:2,w:['s10','s12'],d:'One- and two-year trade courses: electrician, fitter, welder, mechanic, COPA and more.'},
  {t:'trade',k:'DDU-GKY',n:'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',o:'Ministry of Rural Development',u:'https://ddugky.gov.in',s:'gov',c:'free',cn:'Free, incl. stay',cert:true,l:'Hindi + regional',off:true,lv:2,w:['s10','s12'],d:'Free residential training with placement support for rural youth aged 15 to 35 from poor households.'},
  {t:'trade',k:'Tata STRIVE',n:'Tata STRIVE',o:'Tata Community Initiatives Trust',u:'https://tatastrive.com/what-we-do/courses/',s:'pvt',c:'free',cn:'Free',cert:true,l:'Hindi, English + regional',off:true,lv:2,w:['s10','s12'],d:'Free job-oriented training in hospitality, retail, automotive and more, with placement help.'},
  {t:'trade',k:'NAPS',n:'Apprenticeship India (NAPS)',o:'Ministry of Skill Development',u:'https://www.apprenticeshipindia.gov.in/apprenticeship/opportunity',s:'gov',c:'paid',cn:'Monthly stipend',cert:true,l:'Hindi, English',off:true,lv:3,w:['s10','s12','grad'],d:'Train on the job at a real company and earn a monthly stipend, with a certificate at the end.'},
  {t:'trade',k:'NATS',n:'National Apprenticeship Training Scheme',o:'Ministry of Education',u:'https://nats.education.gov.in/student_type.php',s:'gov',c:'paid',cn:'Monthly stipend',cert:true,l:'English, Hindi',off:true,lv:3,w:['grad'],d:'Paid apprenticeships for engineering graduates, diploma holders and general graduates.'},

  // Degrees & School
  {t:'degree',k:'NIOS',n:'National Institute of Open Schooling',o:'Ministry of Education',u:'https://www.nios.ac.in/online-course-material.aspx',s:'gov',c:'low',cn:'Low fees',cert:true,l:'Hindi, English + regional',off:true,lv:1,w:['s10'],d:'Finish Class 10 or Class 12 at your own pace, from home. Recognised for college admission and jobs.'},
  {t:'degree',k:'NDLI',n:'National Digital Library of India',o:'IIT Kharagpur · Ministry of Education',u:'https://ndl.iitkgp.ac.in',s:'gov',c:'free',cn:'Free',cert:false,l:'Many Indian languages',off:false,lv:1,w:ALL,d:'Millions of free books, papers and lectures for every level, in one search.'},
  {t:'degree',k:'SWAYAM',n:'SWAYAM',o:'Ministry of Education',u:'https://swayam.gov.in/explorer',s:'gov',c:'cert',cn:'Exam fee for certificate',cert:true,l:'English, Hindi',off:false,lv:2,w:['s12','grad','work'],d:'Free university-level courses. Credits from passed exams can transfer to your degree.'},
  {t:'degree',k:'IGNOU',n:'IGNOU Degrees & Diplomas',o:'Indira Gandhi National Open University',u:'https://ignouadmission.samarth.edu.in/',s:'gov',c:'low',cn:'Low fees',cert:true,l:'English, Hindi',off:true,lv:2,w:['s12','grad','work'],d:'Bachelor\'s, master\'s and diploma programmes at a fraction of regular college fees. Fee exemptions for some groups.'},
  {t:'degree',k:'e-PG Pathshala',n:'e-PG Pathshala',o:'INFLIBNET · UGC',u:'https://epgp.inflibnet.ac.in/Home',s:'gov',c:'free',cn:'Free',cert:false,l:'English',off:false,lv:3,w:['grad'],d:'Free postgraduate study material across 70+ subjects, made by UGC.'},
  {t:'degree',k:'Coursera',n:'Coursera',o:'Coursera',u:'https://www.coursera.org/courses?query=free',s:'pvt',c:'cert',cn:'Financial aid available',cert:true,l:'English, some Hindi',off:false,lv:3,w:['s12','grad','work'],d:'Courses from top universities and companies. Audit many for free, or apply for financial aid.'},
  {t:'degree',k:'edX',n:'edX',o:'edX',u:'https://www.edx.org/search',s:'pvt',c:'cert',cn:'Verified certificate extra',cert:true,l:'English',off:false,lv:3,w:['s12','grad','work'],d:'University courses from MIT, Harvard, IITs and others. Audit for free.'},
  {t:'degree',k:'MIT OCW',n:'MIT OpenCourseWare',o:'MIT',u:'https://ocw.mit.edu/search/',s:'pvt',c:'free',cn:'Free',cert:false,l:'English',off:false,lv:3,w:['grad','work'],d:'Lecture notes, videos and exams from thousands of MIT courses. No sign-up needed.'},

  // Exams & Study
  {t:'exams',k:'NCERT',n:'NCERT Textbooks (PDF)',o:'NCERT',u:'https://ncert.nic.in/textbook.php',s:'gov',c:'free',cn:'Free',cert:false,l:'Hindi, English, Urdu',off:true,lv:1,w:ALL,d:'Every NCERT book from Class 1 to 12, free to download. The base for boards, NEET, JEE and UPSC.'},
  {t:'exams',k:'DIKSHA',n:'DIKSHA',o:'Ministry of Education',u:'https://diksha.gov.in/explore',s:'gov',c:'free',cn:'Free',cert:false,l:'Many Indian languages',off:false,lv:1,w:['s10','s12'],d:'Lessons, practice and explainers mapped to your school textbook. Scan the QR code in your book.'},
  {t:'exams',k:'Khan Academy',n:'Khan Academy',o:'Khan Academy',u:'https://www.khanacademy.org',s:'pvt',c:'free',cn:'Free',cert:false,l:'English, Hindi',off:false,lv:1,w:['s10','s12'],d:'Maths and science from basics up, with practice that adapts to you.'},
  {t:'exams',k:'Swayam Prabha',n:'Swayam Prabha TV Channels',o:'Ministry of Education',u:'https://swayamprabha.gov.in',s:'gov',c:'free',cn:'Free, no internet',cert:false,l:'English, Hindi',off:true,lv:2,w:['s10','s12','grad'],d:'Free educational TV channels on DD Free Dish, including IIT-PAL classes for JEE preparation.'},
  {t:'exams',k:'Unacademy',n:'Unacademy Free Classes',o:'Unacademy',u:'https://unacademy.com',s:'pvt',c:'low',cn:'Free classes; plans extra',cert:false,l:'Hindi, English + regional',off:false,lv:2,w:['s12','grad'],d:'Free live classes for UPSC, SSC, banking, JEE and NEET. Full courses are paid.'},
  {t:'exams',k:'Physics Wallah',n:'Physics Wallah',o:'PW',u:'https://www.pw.live',s:'pvt',c:'low',cn:'Low-cost batches',cert:false,l:'Hindi, English',off:false,lv:3,w:['s10','s12','grad'],d:'Low-priced batches for JEE, NEET, boards and govt exams, plus many free lectures.'},

  // Business & Money
  {t:'biz',k:'NCFE',n:'Financial Education Programmes',o:'National Centre for Financial Education',u:'https://ncfe.org.in/e-lms/',s:'gov',c:'free',cn:'Free',cert:false,l:'English, Hindi + regional',off:false,lv:1,w:ALL,d:'Learn saving, banking, insurance and avoiding fraud. Backed by RBI, SEBI, IRDAI and PFRDA.'},
  {t:'biz',k:'Startup India',n:'Startup India Learning Programme',o:'DPIIT · Ministry of Commerce',u:'https://www.startupindia.gov.in/content/sih/en/learning-and-development_v2.html',s:'gov',c:'free',cn:'Free',cert:true,l:'English, Hindi + regional',off:false,lv:1,w:['s12','grad','work'],d:'A free course on starting up: finding an idea, testing it, and raising money.'},
  {t:'biz',k:'HubSpot',n:'HubSpot Academy',o:'HubSpot',u:'https://academy.hubspot.com/courses',s:'pvt',c:'free',cn:'Free',cert:true,l:'English',off:false,lv:2,w:['s12','grad','work'],d:'Free certificates in digital marketing, sales and customer service.'},
  {t:'biz',k:'Alison',n:'Alison',o:'Alison',u:'https://alison.com/courses',s:'pvt',c:'cert',cn:'Certificate paid',cert:true,l:'English',off:false,lv:2,w:ALL,d:'Thousands of free short courses in business, accounting and management.'},
  {t:'biz',k:'NIESBUD',n:'Entrepreneurship Development Programmes',o:'NIESBUD · Ministry of Skill Development',u:'https://www.niesbud.nic.in',s:'gov',c:'low',cn:'Low or no fee',cert:true,l:'English, Hindi',off:true,lv:3,w:['s12','grad','work'],d:'Training to start and run a small business, including how to use government schemes and loans.'},

  // Digital & English
  {t:'digital',k:'LearnEnglish',n:'LearnEnglish',o:'British Council',u:'https://learnenglish.britishcouncil.org',s:'pvt',c:'free',cn:'Free',cert:false,l:'English',off:false,lv:1,w:ALL,d:'Free grammar, vocabulary, listening and speaking practice for every level.'},
  {t:'digital',k:'Duolingo',n:'Duolingo English',o:'Duolingo',u:'https://www.duolingo.com/course/en/hi/Learn-English',s:'pvt',c:'free',cn:'Free',cert:false,l:'Learn from Hindi and other Indian languages',off:false,lv:1,w:ALL,d:'Five-minute daily English lessons on your phone, starting from Hindi.'},
  {t:'digital',k:'NCS',n:'National Career Service',o:'Ministry of Labour & Employment',u:'https://www.ncs.gov.in',s:'gov',c:'free',cn:'Free',cert:false,l:'English, Hindi + regional',off:true,lv:2,w:ALL,d:'Free career counselling, job listings, job fairs and soft-skill courses.'},
  {t:'digital',k:'Great Learning',n:'Great Learning Academy',o:'Great Learning',u:'https://www.mygreatlearning.com/academy',s:'pvt',c:'free',cn:'Free',cert:true,l:'English, some Hindi',off:false,lv:2,w:['s12','grad','work'],d:'Free courses in Excel, data, marketing and communication, with free certificates.'},
  {t:'digital',k:'SkillUp',n:'Simplilearn SkillUp',o:'Simplilearn',u:'https://www.simplilearn.com/skillup-free-online-courses',s:'pvt',c:'free',cn:'Free',cert:true,l:'English',off:false,lv:2,w:['s12','grad','work'],d:'Free beginner courses in digital marketing, project management and IT.'},
  {t:'digital',k:'TCS iON',n:'TCS iON Career Edge',o:'Tata Consultancy Services',u:'https://learning.tcsionhub.in/courses/career-edge-young-professional/',s:'pvt',c:'free',cn:'Free',cert:true,l:'English',off:false,lv:3,w:['s12','grad'],d:'A free course on workplace skills: resumes, interviews, email writing and business etiquette.'},
];

