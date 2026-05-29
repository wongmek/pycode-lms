import React, { useState, useEffect } from 'react';

// --- รายการโจทย์ Lab จากบทเรียน Python Basics DIC M4 ---
const LESSON_LABS = [
    {
        id: 'syntax-lab',
        category: 'Syntax & White Space',
        title: 'Lab 4: เรียนรู้เรื่องการย่อหน้า (Indentation)',
        description: 'สไลด์หน้า 4 ระบุว่า Python ใช้ White Space ในการแบ่ง Scope แทนวงเล็บปีกกา { } ลองเขียนโปรแกรมที่มีเงื่อนไข If-Else เพื่อดูว่าขอบเขตทำงานอย่างไร',
        instruction: 'จงแก้โค้ดด้านล่างให้มีการย่อหน้าที่ถูกต้อง (กดปุ่ม Tab หรือปุ่มลัดด้านล่างเพื่อย่อหน้าให้ตรงบล็อก)',
        template: `score = 85
if score >= 80:
print("คุณได้เกรด A!")
else:
print("พยายามใหม่อีกครั้งนะ!")`,
        solution: `score = 85
if score >= 80:
    print("คุณได้เกรด A!")
else:
    print("พยายามใหม่อีกครั้งนะ!")`,
        testCases: [
            { input: '', expected: 'คุณได้เกรด A!' }
        ],
        hint: 'ดูหน้า 4 ของบทเรียน: โค้ดที่อยู่ภายใต้เงื่อนไข if และ else ต้องทำการย่อหน้า (Indentation) เคาะสเปซบาร์ 4 ครั้ง หรือใช้ 1 Tab ให้เท่ากันนะ!',
        slideRef: 'หน้า 4'
    },
    {
        id: 'variables-lab',
        category: 'Variables & Types',
        title: 'Lab 10: ตัวแปรและการรับค่าข้อมูล',
        description: 'เรียนรู้เรื่อง Variable และ Data Types (หน้า 5-30) ลองคำนวณพื้นที่รูปสี่เหลี่ยมโดยรับข้อมูลตัวเลขแบบจำนวนเต็ม',
        instruction: 'กำหนดให้ width = 10 และ height = 5 จงเขียนโค้ดคำนวณหาพื้นที่ (width คูณ height) แล้วเก็บไว้ในตัวแปร area จากนั้นทำการ print(area) ออกมาให้ถูกต้อง',
        template: `width = 10
height = 5
# จงคำนวณพื้นที่และสั่ง print ออกมา
area = 
print()`,
        solution: `width = 10
height = 5
area = width * height
print(area)`,
        testCases: [
            { input: '', expected: '50' }
        ],
        hint: 'สูตรคำนวณพื้นที่คือ กว้าง คูณ ยาว (ใช้เครื่องหมาย * ในการคูณ) และอย่าลืมเอาผลลัพธ์มาแสดงผลด้วย print(area)',
        slideRef: 'หน้า 5-30'
    },
    {
        id: 'lab-71',
        category: 'Functions & Loops',
        title: 'Lab 71: โปรแกรมหาผลรวม 1 ถึง N ด้วย Function',
        description: 'จากสไลด์หน้า 192: สร้างฟังก์ชันเพื่อคำนวณหาผลรวมของจำนวนเต็มตั้งแต่ 1 ถึงจำนวนใดๆ (N)',
        instruction: 'จงเติมคำในช่องว่างเพื่อสร้างฟังก์ชัน sum_to_n(n) ที่รับค่า n แล้วคำนวณหาผลรวมเก็บใน total จากนั้นคืนค่ากลับ (return) ออกมา',
        template: `def sum_to_n(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    # ส่งค่า total กลับออกไป
    
# ทดสอบฟังก์ชัน
result = sum_to_n(10)
print(result)`,
        solution: `def sum_to_n(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total

result = sum_to_n(10)
print(result)`,
        testCases: [
            { input: '10', expected: '55' }
        ],
        hint: 'ดูหน้า 180 และ 192: การประกาศ def Function ต้องมีการส่งค่ากลับออกไปนอกฟังก์ชันด้วยคำสั่ง return เสมอ!',
        slideRef: 'หน้า 192'
    },
    {
        id: 'lab-72',
        category: 'Functions & Loops',
        title: 'Lab 72: โปรแกรมคํานวณผลรวมของจํานวนคู่ 1 ถึง N',
        description: 'จากสไลด์หน้า 193: สร้างฟังก์ชันเพื่อคํานวณหาผลรวมของจํานวนคู่เท่านั้น ตั้งแต่ 1 ถึง N',
        instruction: 'จงสร้างฟังก์ชัน sum_evens(n) เพื่อหาผลรวมจำนวนคู่ตั้งแต่ 1 ถึง n และทำการส่งค่ากลับ',
        template: `def sum_evens(n):
    total = 0
    for i in range(1, n + 1):
        # ตรวจสอบว่าเป็นจำนวนคู่หรือไม่
        if i % 2 == 0:
            total += i
    return total

print(sum_evens(10))`,
        solution: `def sum_evens(n):
    total = 0
    for i in range(1, n + 1):
        if i % 2 == 0:
            total += i
    return total

print(sum_evens(10))`,
        testCases: [
            { input: '10', expected: '30' }
        ],
        hint: 'ดูหน้า 193: จำนวนคู่คือจำนวนที่หารด้วย 2 ลงตัว (ใช้เครื่องหมาย Modulo % เพื่อเช็คเศษ i % 2 == 0)',
        slideRef: 'หน้า 193'
    },
    {
        id: 'lab-73',
        category: 'Functions',
        title: 'Lab 73: ตารางสูตรคูณแม่ N (mul_table)',
        description: 'จากสไลด์หน้า 194: สร้างฟังก์ชัน mul_table(n) สำหรับแสดงตารางสูตรคูณของแม่ n ตั้งแต่ x1 ถึง x12',
        instruction: 'สร้างฟังก์ชัน mul_table(n) ให้พิมพ์สูตรคูณออกมา เช่น สำหรับ mul_table(2) จะพิมพ์ 2 x 1 = 2 จนถึง 2 x 12 = 24 บรรทัดต่อบรรทัด',
        template: `def mul_table(n):
    for i in range(1, 13):
        # เติมคำสั่งพิมพ์สูตรคูณในรูปแบบ: n x i = ผลลัพธ์
        print(f"{n} x {i} = {n * i}")

mul_table(2)`,
        solution: `def mul_table(n):
    for i in range(1, 13):
        print(f"{n} x {i} = {n * i}")

mul_table(2)`,
        testCases: [
            { input: '2', expected: '2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10\n2 x 6 = 12\n2 x 7 = 14\n2 x 8 = 16\n2 x 9 = 18\n2 x 10 = 20\n2 x 11 = 22\n2 x 12 = 24' }
        ],
        hint: 'ดูหน้า 194: สั่งปริ้นทีละบรรทัดในลูป โดยคำนวณ n * i ในวงเล็บ หรือใช้ f-string ช่วยจัดข้อความ',
        slideRef: 'หน้า 194'
    },
    {
        id: 'olympic-a1',
        category: 'โจทย์โอลิมปิก (A1)',
        title: 'Olympic A1: หรม. (Greatest Common Divisor)',
        description: 'โจทย์แข่งขัน: สร้างฟังก์ชันหา หรม. ของตัวเลข 2 จำนวน ซึ่งเป็นพื้นฐานของการแก้ปัญหาคณิตศาสตร์ในระดับโอลิมปิกวิชาการ',
        instruction: 'สร้างฟังก์ชัน gcd(a, b) เพื่อหาตัวหารร่วมมาก โดยใช้การวนลูป (while) และการหารเอาเศษ (modulo %)',
        template: `def gcd(a, b):
    # เติมโค้ดหา หรม. ที่นี่
    pass
    
print(gcd(48, 18))`,
        solution: `def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

print(gcd(48, 18))`,
        testCases: [{ input: '48, 18', expected: '6' }],
        hint: 'ลองใช้ Euclidean Algorithm: วนลูปจนกว่า b จะเป็น 0 โดยให้ a = b และ b = a % b',
        slideRef: 'โจทย์เสริมทักษะโอลิมปิก'
    },
    {
        id: 'olympic-a2',
        category: 'โจทย์โอลิมปิก (A2)',
        title: 'Olympic A2: จำนวนเฉพาะ (Prime Number)',
        description: 'โจทย์แข่งขัน: จำนวนเฉพาะคือจำนวนที่หารด้วย 1 และตัวมันเองลงตัวเท่านั้น ลองเขียนโปรแกรมตรวจสอบดูสิ',
        instruction: 'สร้างฟังก์ชัน is_prime(n) คืนค่า True หากเป็นจำนวนเฉพาะ และ False หากไม่ใช่',
        template: `def is_prime(n):
    if n <= 1:
        return False
    # เติมลูปตรวจสอบจำนวนเฉพาะที่นี่
    pass
    
print(is_prime(17))
print(is_prime(15))`,
        solution: `def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True

print(is_prime(17))
print(is_prime(15))`,
        testCases: [{ input: '17, 15', expected: 'True\nFalse' }],
        hint: 'วนลูป i ตั้งแต่ 2 ถึง n-1 หากมีตัวไหนที่ n % i == 0 แปลว่าไม่ใช่จำนวนเฉพาะ (คืนค่า False)',
        slideRef: 'โจทย์เสริมทักษะโอลิมปิก'
    },
    {
        id: 'olympic-a3',
        category: 'โจทย์โอลิมปิก (A3)',
        title: 'Olympic A3: พีระมิดดวงดาว (Star Pyramid)',
        description: 'โจทย์แข่งขันคลาสสิก: ทดสอบความเข้าใจเรื่อง Nested Loop (ลูปซ้อนลูป) ด้วยการวาดรูป',
        instruction: 'สร้างฟังก์ชัน draw_pyramid(n) พิมพ์ดวงดาว (*) เป็นรูปพีระมิดสูง n ชั้น',
        template: `def draw_pyramid(n):
    for i in range(1, n + 1):
        # พิมพ์ช่องว่างตามด้วยดาว
        print()
        
draw_pyramid(3)`,
        solution: `def draw_pyramid(n):
    for i in range(1, n + 1):
        spaces = " " * (n - i)
        stars = "*" * (2 * i - 1)
        print(spaces + stars)

draw_pyramid(3)`,
        testCases: [{ input: '3', expected: '  *\n ***\n*****' }],
        hint: 'จำนวนดาวแต่ละชั้นคือ 2*i - 1 และจำนวนช่องว่างด้านหน้าคือ n - i (ใช้เครื่องหมาย * เพื่อคูณตัวอักษรได้)',
        slideRef: 'โจทย์เสริมทักษะโอลิมปิก'
    }
];

// ข้อมูลจำลองสำหรับโหมด Demo ในเครื่อง (Bypass)
const MOCK_CLASS_STUDENTS = [
    {
        id: 'std-01',
        name: 'น้องก้องเกียรติ (15 ปี)',
        avatar: '🧑‍💻',
        xp: 650,
        consistency: 85,
        completedMap: {
            'syntax-lab': true,
            'variables-lab': true,
            'lab-71': true,
            'lab-72': false,
            'lab-73': true,
            'olympic-a1': true,
            'olympic-a2': false,
            'olympic-a3': false,
        },
        skills: { logic: 90, variables: 85, functions: 75, problemSolving: 80, consistency: 85 },
        latestCode: "def gcd(a, b):\n    while b != 0:\n        a, b = b, a % b\n    return a\n\nprint(gcd(48, 18))",
        feedbackFromTeacher: ''
    }
];

const CLASS_AVERAGE_SKILLS = {
    logic: 80,
    variables: 75,
    functions: 65,
    problemSolving: 70,
    consistency: 75
};

export default function App() {
    // --- AUTH & RBAC STATES ---
    const [userRole, setUserRole] = useState(null); // 'student', 'teacher', 'parent', หรือ null
    const [currentUser, setCurrentUser] = useState(null);
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [signupUsername, setSignupUsername] = useState('');
    const [signupRole, setSignupRole] = useState('student');

    // --- GENERAL STATES ---
    const [currentTab, setCurrentTab] = useState('dashboard');
    const [selectedLabIndex, setSelectedLabIndex] = useState(0);
    const [editorCode, setEditorCode] = useState(LESSON_LABS[0].template);
    const [terminalOutput, setTerminalOutput] = useState('');
    const [indentGuides, setIndentGuides] = useState(true);
    const [customApiKey, setCustomApiKey] = useState('');

    const [completedLabs, setCompletedLabs] = useState({
        'syntax-lab': false,
        'variables-lab': false,
        'lab-71': false,
        'lab-72': false,
        'lab-73': false,
        'olympic-a1': false,
        'olympic-a2': false,
        'olympic-a3': false,
    });
    const [xp, setXp] = useState(0);
    const [badges, setBadges] = useState([]);

    const [traceSteps, setTraceSteps] = useState([]);
    const [currentTraceStepIndex, setCurrentTraceStepIndex] = useState(-1);
    const [isTracing, setIsTracing] = useState(false);

    const [aiResponse, setAiResponse] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiErrorMsg, setAiErrorMsg] = useState('');

    const [dailyCompleted, setDailyCompleted] = useState(false);
    const [peerReviews, setPeerReviews] = useState([
        { id: 1, author: 'น้องปังปอนด์ (15 ปี)', labName: 'Lab 71', code: "def sum_to_n(n):\n  t = 0\n  for i in range(1, n+1):\n    t += i\n  return t", feedback: '', stars: 0, checked: false }
    ]);

    const [studentList, setStudentList] = useState(MOCK_CLASS_STUDENTS);
    const [selectedStudentId, setSelectedStudentId] = useState('std-01');
    const [teacherFeedbackInput, setTeacherFeedbackInput] = useState('');

    // --- PYODIDE INTERPRETER STATE ---
    const [pyodide, setPyodide] = useState(null);

    // Initialize Pyodide
    useEffect(() => {
        async function loadPyodideInstance() {
            try {
                if (window.loadPyodide) {
                    const instance = await window.loadPyodide();
                    setPyodide(instance);
                    console.log("🐍 Pyodide loaded successfully");
                }
            } catch (err) {
                console.error("Failed to load Pyodide:", err);
            }
        }
        loadPyodideInstance();
    }, []);

    // ตรวจเช็คสถานะการเข้าสู่ระบบปัจจุบันผ่าน LocalStorage (JWT Token)
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                setCurrentUser(user);
                setUserRole(user.role);
                setXp(user.xp || 0);
                setCurrentTab(user.role === 'teacher' ? 'teacher' : user.role === 'parent' ? 'parent' : 'dashboard');
            } catch (e) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
    }, []);

    // โหลดสถิติตารางเรียนรวมเมื่อครูล็อกอินเข้าใช้
    useEffect(() => {
        if (userRole === 'teacher' && currentUser && currentUser.id !== 'teacher-demo') {
            fetchTeacherData();
        }
    }, [userRole, currentUser]);

    useEffect(() => {
        generateVisualTrace(editorCode);
    }, [editorCode, selectedLabIndex]);

    // ฟังก์ชันดึงสถิตินักเรียนทั้งหมดจากหลังบ้าน MySQL Express API
    const fetchTeacherData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/teacher/students', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success && data.students.length > 0) {
                setStudentList(data.students);
                setSelectedStudentId(data.students[0].id);
            }
        } catch (e) {
            console.warn("ระบบใช้ฐานข้อมูลจำลองชั่วคราวเนื่องจากเซิร์ฟเวอร์หลังบ้านยังไม่ได้เปิดใช้", e);
        }
    };

    const selectLab = (index) => {
        setSelectedLabIndex(index);
        setEditorCode(LESSON_LABS[index].template);
        setTerminalOutput('');
        setIsTracing(false);
        setCurrentTraceStepIndex(-1);
        setAiResponse('');
    };

    // ลงชื่อสมัครและเข้าสู่ระบบด้วย Express API
    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        if (!authEmail || !authPassword) {
            setAuthError('กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน');
            return;
        }

        setAuthLoading(true);
        setAuthError('');

        const targetUrl = isSignUpMode ? '/api/auth/signup' : '/api/auth/login';
        const payload = isSignUpMode
            ? { email: authEmail, password: authPassword, username: signupUsername, role: signupRole }
            : { email: authEmail, password: authPassword };

        try {
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // Read as text first to avoid "Unexpected end of JSON input" and help debugging
            const responseText = await response.text();
            let result;
            try {
                result = JSON.parse(responseText);
            } catch (e) {
                console.error('Failed to parse JSON:', responseText);
                throw new Error(`Server returned invalid response: ${response.status}`);
            }

            if (!response.ok || result.error) {
                throw new Error(result.error || 'การยืนยันตัวตนผิดพลาด');
            }

            if (isSignUpMode) {
                alert('สมัครสมาชิกสำเร็จแล้ว! กรุณากรอกรหัสผ่านเพื่อเข้าสู่ระบบอีกครั้งครับ');
                setIsSignUpMode(false);
                setSignupUsername('');
            } else {
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));

                setCurrentUser(result.user);
                setUserRole(result.user.role);
                setXp(result.user.xp || 0);

                if (result.user.role === 'teacher') {
                    setCurrentTab('teacher');
                } else if (result.user.role === 'parent') {
                    setCurrentTab('parent');
                } else {
                    setCurrentTab('dashboard');
                }
            }
        } catch (err) {
            setAuthError(err.message || 'ไม่สามารถติดต่อเซิร์ฟเวอร์ API หลังบ้านได้');
        } finally {
            setAuthLoading(false);
        }
    };

    // ฟังก์ชันข้ามระบบล็อกอิน (Quick Demo Bypass) เพื่อทดสอบส่วน UI
    const handleQuickDemoBypass = (role) => {
        setUserRole(role);
        if (role === 'teacher') {
            setCurrentUser({ id: 'teacher-demo', email: 'teacher@pycode.com', username: 'คุณครูสมชาย (Demo)', avatar: '👨‍🏫' });
            setCurrentTab('teacher');
        } else if (role === 'parent') {
            setCurrentUser({ id: 'parent-demo', email: 'parent@pycode.com', username: 'คุณพ่อก้องเกียรติ (Demo)', avatar: '👨‍👩‍👧‍👦' });
            setCurrentTab('parent');
        } else {
            setCurrentUser({ id: 'student-demo', email: 'student@pycode.com', username: 'น้องก้องเกียรติ (Demo)', avatar: '🧑‍💻' });
            setXp(650);
            setCompletedLabs({
                'syntax-lab': true,
                'variables-lab': true,
                'lab-71': true,
                'lab-72': false,
                'lab-73': false,
                'olympic-a1': false,
                'olympic-a2': false,
                'olympic-a3': false,
            });
            setCurrentTab('dashboard');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCurrentUser(null);
        setUserRole(null);
        setAuthEmail('');
        setAuthPassword('');
    };

    const generateVisualTrace = (code) => {
        const lines = code.split('\n');
        const steps = [];
        let vars = {};

        lines.forEach((line, index) => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;

            if (trimmed.includes('=')) {
                const parts = trimmed.split('=');
                const varName = parts[0].trim();

                if (varName === 'score') vars['score'] = '85 (Int)';
                else if (varName === 'width') vars['width'] = '10 (Int)';
                else if (varName === 'height') vars['height'] = '5 (Int)';
                else if (varName === 'area') vars['area'] = '50 (Int)';
                else if (varName === 'total') vars['total'] = '0 (Int)';
            }

            if (trimmed.startsWith('for i in range')) {
                steps.push({
                    lineIndex: index,
                    text: line,
                    vars: { ...vars, i: '1 (Int)' },
                    comment: 'วนลูปทีละค่า: ตัวแปร i เริ่มต้นเป็นค่าแรกในเงื่อนไข'
                });
                return;
            }

            if (trimmed.startsWith('print')) {
                let printText = 'แสดงผลออกทางหน้าจอ';
                if (trimmed.includes('score')) printText = 'เช็คเงื่อนไขแล้วเงื่อนไขเป็นจริง -> แสดงผล "คุณได้เกรด A!"';
                steps.push({
                    lineIndex: index,
                    text: line,
                    vars: { ...vars },
                    comment: printText
                });
                return;
            }

            steps.push({
                lineIndex: index,
                text: line,
                vars: { ...vars },
                comment: 'ประมวลผลคำสั่งทีละบรรทัด'
            });
        });

        setTraceSteps(steps);
    };

    const handleNextStep = () => {
        if (traceSteps.length === 0) return;
        setIsTracing(true);
        if (currentTraceStepIndex < traceSteps.length - 1) {
            setCurrentTraceStepIndex(prev => prev + 1);
        } else {
            setIsTracing(false);
            setCurrentTraceStepIndex(-1);
        }
    };

    // --- GEMINI AI CODE MENTOR ---
    const askAiMentor = async () => {
        setIsAiLoading(true);
        setAiErrorMsg('');
        setAiResponse('');

        const activeLab = LESSON_LABS[selectedLabIndex];
        const systemPrompt = `คุณคือ AI Code Mentor สำหรับเด็กวัย 13-18 ปีที่กำลังฝึกเขียนภาษา Python โดยอิงตามบทเรียน "Python Basics DIC M4"
    หน้าที่ของคุณคือ:
    1. อธิบายจุดผิดพลาดแบบเป็นกันเองและเข้าอกเข้าใจ ไม่ใช้คำยากๆ
    2. ห้ามเฉลยโค้ดที่ถูกต้องแบบทันที ให้ใช้วิธีบอกใบ้ (Contextual Hints)
    3. เชื่อมโยงกับหน้าบทเรียนในไฟล์ PDF ดังต่อไปนี้ให้เหมาะสม:
       - เรื่องการย่อหน้า/บล็อกขอบเขตด้วย White Space อยู่ที่ "หน้า 4"
       - เรื่องตัวแปรและการรับส่งข้อมูล อยู่ที่ "หน้า 5 ถึง 30"
       - เรื่องคำสั่งตรวจสอบเงื่อนไข (If-Else) อยู่ที่ "หน้า 102"
       - เรื่องการสร้างฟังก์ชัน (def) อยู่ที่ "หน้า 180" และ "หน้า 192-196" (Labs 71, 72, 73, 74, 75)
    
    คำถามหรือข้อผิดพลาดของผู้ใช้จะเกี่ยวกับ Lab: ${activeLab.title}
    รายละเอียดโจทย์: ${activeLab.description}
    โค้ดปัจจุบันที่เด็กเขียน:
    \`\`\`python
    ${editorCode}
    \`\`\`
    ผลลัพธ์ของระบบตรวจคะแนนปัจจุบัน: ${terminalOutput || 'ยังไม่ได้กดรันโค้ด'}`;

        try {
            const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${customApiKey}`;
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: "ช่วยแนะนำใบ้ข้อผิดพลาดของโค้ดนี้ให้หนูหน่อยครับพี่ Mentor" }] }],
                    systemInstruction: { parts: [{ text: systemPrompt }] }
                })
            });

            if (!response.ok) {
                throw new Error('ไม่สามารถเข้าใช้งาน API ได้ เนื่องจาก Key ไม่ถูกต้อง หรือเกิดความผิดพลาดของระบบ');
            }

            const result = await response.json();
            const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (textResponse) {
                setAiResponse(textResponse);
            } else {
                setAiResponse('อืมม พี่เมนเทอร์ยังนึกไม่ออก ลองเช็คเรื่องการประกาศตัวแปรและการย่อหน้าดูก่อนนะ!');
            }
        } catch (error) {
            setAiErrorMsg(error.message || 'เกิดข้อผิดพลาดในการเรียกพี่เมนเทอร์ ลองสลับไปใส่ API Key ของคุณในแท็บการตั้งค่า');
            setAiResponse(`💡 [Local System Hint]: ${activeLab.hint} (ข้อมูลอ้างอิง: ${activeLab.slideRef})`);
        } finally {
            setIsAiLoading(false);
        }
    };

    const runCode = async () => {
        const activeLab = LESSON_LABS[selectedLabIndex];
        setTerminalOutput('กำลังเตรียมระบบ Python Interpreter (Pyodide)...\n');

        if (!pyodide) {
            setTerminalOutput('❌ ระบบ Python ยังโหลดไม่เสร็จ กรุณารอสักครู่แล้วลองใหม่ครับ');
            return;
        }

        try {
            // Redirect stdout to capture print() output
            pyodide.runPython(`
                import sys
                import io
                sys.stdout = io.StringIO()
            `);

            // Execute user code
            await pyodide.runPythonAsync(editorCode);

            // Get the output
            const output = pyodide.runPython("sys.stdout.getvalue()");
            
            let finalOutput = output;
            let isCorrect = false;

            // Lab Validation Logic (Optional: based on LESSON_LABS requirements)
            if (activeLab.id === 'syntax-lab') {
                // Check if output is correct and if there's any indentation (spaces or tabs) before print
                const hasIndentation = /:\s*\n[\s\t]+print/.test(editorCode);
                if (output.trim() === 'คุณได้เกรด A!' && hasIndentation) {
                    isCorrect = true;
                    finalOutput += '\n\n>>> ประสบความสำเร็จ! ผ่านการตรวจสอบการย่อหน้า (Indentation)';
                } else {
                    finalOutput += '\n\n>>> ล้มเหลว: ผลลัพธ์ต้องเป็น "คุณได้เกรด A!" และต้องมีการย่อหน้าที่ถูกต้อง (Indentation)';
                }
            } else if (activeLab.id === 'variables-lab') {
                if (output.trim() === '50') {
                    isCorrect = true;
                    finalOutput += '\n\n>>> ประสบความสำเร็จ! คำนวณพื้นที่ได้ถูกต้อง';
                }
            } else if (activeLab.id === 'lab-71') {
                if (output.trim() === '55') {
                    isCorrect = true;
                    finalOutput += '\n\n>>> ประสบความสำเร็จ! ฟังก์ชันทำงานถูกต้อง';
                }
            } else if (activeLab.id === 'lab-72') {
                if (output.trim() === '30') {
                    isCorrect = true;
                    finalOutput += '\n\n>>> ประสบความสำเร็จ! หาผลรวมเลขคู่ได้ถูกต้อง';
                }
            } else if (activeLab.id === 'lab-73') {
                if (output.includes('2 x 12 = 24')) {
                    isCorrect = true;
                    finalOutput += '\n\n>>> ประสบความสำเร็จ! แม่สูตรคูณถูกต้อง';
                }
            } else if (activeLab.id === 'olympic-a1') {
                if (output.trim() === '6') {
                    isCorrect = true;
                    finalOutput += '\n\n>>> 🏆 ยอดเยี่ยม! แก้โจทย์ หรม. สำเร็จ';
                }
            } else if (activeLab.id === 'olympic-a2') {
                if (output.includes('True') && output.includes('False')) {
                    isCorrect = true;
                    finalOutput += '\n\n>>> 🏆 สุดยอด! ตรวจสอบจำนวนเฉพาะสำเร็จ';
                }
            } else if (activeLab.id === 'olympic-a3') {
                if (output.includes('*****')) {
                    isCorrect = true;
                    finalOutput += '\n\n>>> 🏆 เพอร์เฟกต์! วาดพีระมิดสำเร็จ';
                }
            }

            setTerminalOutput(finalOutput || '(ไม่มีการแสดงผล)');

            if (isCorrect) {
                const wasCompleted = completedLabs[activeLab.id];
                setCompletedLabs(prev => ({ ...prev, [activeLab.id]: true }));

                if (!wasCompleted) {
                    const newXp = xp + 100;
                    setXp(newXp);
                    let newBadges = [...badges];
                    if (activeLab.id === 'syntax-lab' && !newBadges.includes('The Logic Master')) {
                        newBadges.push('The Logic Master');
                    }
                    if (activeLab.id === 'lab-73' && !newBadges.includes('Function Wizard')) {
                        newBadges.push('Function Wizard');
                    }
                    setBadges(newBadges);

                    // ส่งคะแนนไปยัง Express API ถ้าเป็นการเข้าสู่ระบบแบบจริง
                    if (currentUser && currentUser.id !== 'student-demo') {
                        const token = localStorage.getItem('token');
                        await fetch('/api/labs/submit', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({
                                userId: currentUser.id,
                                labId: activeLab.id,
                                code: editorCode,
                                isCompleted: true,
                                xpEarned: 100
                            })
                        });
                    }
                }
            }
        } catch (err) {
            setTerminalOutput(`❌ Python Error:\n${err.message}`);
        }
    };

    const generatePortfolioHtml = () => {
        const portfolioContent = `
      <!DOCTYPE html>
      <html lang="th">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Python Developer Portfolio - TCAS</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&display=swap" rel="stylesheet">
        <style>
          body { font-family: 'Kanit', sans-serif; background-color: #0b1329; color: #f8fafc; }
        </style>
      </head>
      <body class="p-8">
        <div class="max-w-4xl mx-auto bg-slate-900 border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
          <div class="text-center mb-8">
            <span class="bg-purple-500/20 text-purple-400 border border-purple-500/40 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold">Student Showcase</span>
            <h1 class="text-4xl font-extrabold mt-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">My Coding Pathway</h1>
            <p class="text-slate-400 mt-2">รวมผลงานจากการฝึกปฏิบัติจริงบนระบบ Smart LMS ของชุดหลักสูตร DIC M4 (Python Basics)</p>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-8">
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span class="text-xs text-slate-400 block">ประสบการณ์สะสม</span>
              <span class="text-2xl font-bold text-teal-400">${xp} XP</span>
            </div>
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span class="text-xs text-slate-400 block">ตราเกียรติยศ</span>
              <span class="text-xl font-bold text-purple-400">${badges.join(', ') || 'ผู้เริ่มต้นแสนกระตือรือร้น'}</span>
            </div>
          </div>

          <h2 class="text-xl font-bold border-b border-slate-800 pb-2 text-slate-200 mb-4">🖥️ ห้องทดลอง (Completed Labs)</h2>
          <div class="space-y-4">
            ${LESSON_LABS.map((lab, index) => {
            const isDone = completedLabs[lab.id];
            return `
                <div class="p-4 rounded-xl bg-slate-950/60 border ${isDone ? 'border-teal-500/20' : 'border-slate-800/40'}">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="font-bold text-lg text-slate-100">${lab.title}</h3>
                    <span class="px-2 py-1 rounded text-xs ${isDone ? 'bg-teal-500/20 text-teal-300' : 'bg-rose-500/20 text-rose-300'}">
                      ${isDone ? 'สำเร็จ 🗸' : 'ยังไม่เสร็จ'}
                    </span>
                  </div>
                  <p class="text-sm text-slate-400 mb-3">${lab.description}</p>
                  ${isDone ? `
                  <div class="bg-slate-900 p-3 rounded-lg font-mono text-xs text-teal-400 overflow-x-auto">
                    ${lab.solution.replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')}
                  </div>` : '<p class="text-xs text-amber-500">ทำการบ้านให้เสร็จเพื่อปลดล็อคโค้ดในพอร์ต!</p>'}
                </div>
              `;
        }).join('')}
          </div>

          <div class="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
            สร้างและรับรองโดยระบบจัดการการเรียนรู้อัจฉริยะ PyCode LMS (สำหรับเยาวชน 13-18 ปี)
          </div>
        </div>
      </body>
      </html>
    `;
        const blob = new Blob([portfolioContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Student_Python_Portfolio.html`;
        link.click();
    };

    const handleSendFeedback = (studentId) => {
        if (!teacherFeedbackInput.trim()) return;
        setStudentList(prev => prev.map(student => {
            if (student.id === studentId) {
                return { ...student, feedbackFromTeacher: teacherFeedbackInput };
            }
            return student;
        }));
        setTeacherFeedbackInput('');
    };

    if (!userRole) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-slate-100 relative overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -z-10"></div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-teal-400 flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-purple-500/40 mb-6">
                    Py
                </div>
                <h1 className="text-3xl font-black text-white mb-2 text-center">เข้าสู่ระบบ PyCode LMS</h1>
                <p className="text-slate-400 text-sm mb-6 text-center max-w-md leading-relaxed">
                    ระบบจัดการการเรียนรู้เชื่อมหลังบ้านด้วย **Express.js 5** และ **MySQL Database**
                </p>

                <div className="w-full max-w-md bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-2xl mb-6">
                    <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <span>🔑</span> {isSignUpMode ? 'สมัครสมาชิกบัญชีผู้ใช้ใหม่' : 'เข้าสู่ระบบด้วยบัญชีผู้ใช้'}
                    </h2>

                    <form onSubmit={handleAuthSubmit} className="space-y-4">
                        {isSignUpMode && (
                            <div>
                                <label className="text-xs text-slate-400 block mb-1.5 font-semibold">ชื่อผู้ใช้ (Display Name):</label>
                                <input
                                    type="text"
                                    placeholder="เช่น น้องก้องเกียรติ สุดโก้"
                                    value={signupUsername}
                                    onChange={(e) => setSignupUsername(e.target.value)}
                                    className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 focus:outline-none focus:border-purple-500 text-slate-200"
                                />
                            </div>
                        )}

                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold">อีเมลบัญชีผู้ใช้ (Email):</label>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                value={authEmail}
                                onChange={(e) => setAuthEmail(e.target.value)}
                                className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 focus:outline-none focus:border-purple-500 text-slate-200"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold">รหัสผ่าน (Password):</label>
                            <input
                                type="password"
                                placeholder="ป้อนรหัสผ่านของคุณ..."
                                value={authPassword}
                                onChange={(e) => setAuthPassword(e.target.value)}
                                className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 focus:outline-none focus:border-purple-500 text-slate-200"
                                required
                            />
                        </div>

                        {isSignUpMode && (
                            <div>
                                <label className="text-xs text-slate-400 block mb-1.5 font-semibold">บทบาทในระบบ (Role):</label>
                                <select
                                    value={signupRole}
                                    onChange={(e) => setSignupRole(e.target.value)}
                                    className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 focus:outline-none focus:border-purple-500 text-slate-300"
                                >
                                    <option value="student">นักเรียน (Student)</option>
                                    <option value="teacher">คุณครู (Teacher)</option>
                                    <option value="parent">ผู้ปกครอง (Parent)</option>
                                </select>
                            </div>
                        )}

                        {authError && (
                            <p className="text-xs text-red-400 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">{authError}</p>
                        )}

                        <button
                            type="submit"
                            disabled={authLoading}
                            className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-600/20 disabled:opacity-50 text-sm"
                        >
                            {authLoading ? 'กำลังตรวจสอบ...' : isSignUpMode ? '🚀 สมัครสมาชิกเลย' : '🔑 เข้าสู่ระบบ'}
                        </button>
                    </form>

                    <div className="mt-4 pt-4 border-t border-slate-800/80 text-center">
                        <button
                            onClick={() => { setIsSignUpMode(!isSignUpMode); setAuthError(''); }}
                            className="text-xs text-purple-400 hover:text-purple-300 underline"
                        >
                            {isSignUpMode ? 'มีบัญชีอยู่แล้ว? กดเพื่อเข้าสู่ระบบ' : 'ยังไม่มีบัญชีผู้ใช้? สมัครสมาชิกที่นี่'}
                        </button>
                    </div>
                </div>

                {/* DEMO BUTTONS */}
                <div className="w-full max-w-4xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="h-px bg-slate-800 w-16"></span>
                        <span className="text-xxs uppercase tracking-wider text-slate-500 font-bold">หรือกดสลับบทบาทจำลองการใช้งาน (Demo Bypass)</span>
                        <span className="h-px bg-slate-800 w-16"></span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => handleQuickDemoBypass('student')}
                            className="flex-1 bg-slate-900/60 border border-slate-800/60 hover:border-teal-500/40 p-4 rounded-xl flex items-center gap-3 transition-all hover:bg-slate-900"
                        >
                            <span className="text-3xl">👨‍💻</span>
                            <div className="text-left">
                                <span className="text-teal-400 font-bold text-xs block">นักเรียน (Demo)</span>
                                <span className="text-[10px] text-slate-500">จำลองการเข้าทำแบบฝึกหัด</span>
                            </div>
                        </button>

                        <button
                            onClick={() => handleQuickDemoBypass('teacher')}
                            className="flex-1 bg-slate-900/60 border border-slate-800/60 hover:border-blue-500/40 p-4 rounded-xl flex items-center gap-3 transition-all hover:bg-slate-900"
                        >
                            <span className="text-3xl">👨‍🏫</span>
                            <div className="text-left">
                                <span className="text-blue-400 font-bold text-xs block">คุณครู (Demo)</span>
                                <span className="text-[10px] text-slate-500">วิเคราะห์เรดาร์ชั้นเรียนทั้งหมด</span>
                            </div>
                        </button>

                        <button
                            onClick={() => handleQuickDemoBypass('parent')}
                            className="flex-1 bg-slate-900/60 border border-slate-800/60 hover:border-pink-500/40 p-4 rounded-xl flex items-center gap-3 transition-all hover:bg-slate-900"
                        >
                            <span className="text-3xl">👨‍👩‍👧‍👦</span>
                            <div className="text-left">
                                <span className="text-pink-400 font-bold text-xs block">ผู้ปกครอง (Demo)</span>
                                <span className="text-[10px] text-slate-500">ดูทักษะเปรียบเทียบของลูก</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col">
            {/* --- HEADER --- */}
            <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-teal-400 flex items-center justify-center text-xl font-black text-white shadow-lg shadow-purple-500/20">
                            Py
                        </div>
                        <div>
                            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                                PyCode <span className="text-teal-400 text-base font-semibold">LMS</span>
                            </span>
                            <p className="text-xxs text-slate-500 leading-none">สำหรับน้องๆ อายุ 13-18 ปี | สมาธิและเรียนรู้แบบมีลำดับ</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {userRole === 'student' && (
                            <>
                                <div className="hidden sm:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 text-sm">
                                    <span className="text-amber-400 font-bold">🔥 {xp} XP</span>
                                </div>

                                <div className="hidden md:flex items-center gap-1 bg-purple-950/40 text-purple-300 px-3 py-1.5 rounded-full border border-purple-500/20 text-xs">
                                    🎖️ <span>ตรารางวัล: {badges.length} อัน</span>
                                </div>

                                <div className="relative group">
                                    <input
                                        type="password"
                                        placeholder="🔑 ใส่ Gemini API Key..."
                                        value={customApiKey}
                                        onChange={(e) => setCustomApiKey(e.target.value)}
                                        className="w-36 md:w-48 text-xs bg-slate-900 border border-slate-800 rounded-lg py-1 px-2 focus:outline-none focus:border-purple-500 text-slate-300 transition-all placeholder:text-slate-600"
                                    />
                                    <span className="absolute -top-6 left-0 bg-slate-900 text-slate-400 text-xxs px-2 py-0.5 rounded border border-slate-800 hidden group-hover:block whitespace-nowrap">
                                        สำหรับระบบ AI Mentor
                                    </span>
                                </div>
                            </>
                        )}

                        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-800">
                            <span className={`text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1.5 ${userRole === 'teacher' ? 'bg-blue-500/20 text-blue-400' : userRole === 'parent' ? 'bg-pink-500/20 text-pink-400' : 'bg-teal-500/20 text-teal-400'}`}>
                                <span>{userRole === 'teacher' ? '👨‍🏫' : userRole === 'parent' ? '👨‍👩‍👧‍👦' : '👨‍💻'}</span>
                                {currentUser?.username || 'ผู้ใช้งาน'}
                            </span>
                            <button onClick={handleLogout} className="text-xs text-slate-500 hover:text-white transition-colors underline">
                                ออกจากระบบ
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- CONTENT CONTAINER --- */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 flex flex-col md:flex-row gap-6">
                <aside className="w-full md:w-64 flex flex-row md:flex-col gap-2 shrink-0 overflow-x-auto pb-2 md:pb-0">

                    {userRole === 'student' && (
                        <>
                            <button
                                onClick={() => setCurrentTab('dashboard')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'dashboard' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/10' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                            >
                                📊 ภาพรวมระบบ (Dashboard)
                            </button>

                            <button
                                onClick={() => setCurrentTab('learning')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'learning' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/10' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                            >
                                🗺️ แผนการเรียน (Roadmap)
                            </button>

                            <button
                                onClick={() => { setCurrentTab('editor'); selectLab(selectedLabIndex); }}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'editor' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/10' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                            >
                                💻 ห้องทดลองโค้ด (Sandbox)
                            </button>

                            <button
                                onClick={() => setCurrentTab('challenges')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'challenges' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/10' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                            >
                                🏆 ตะลุยโจทย์รายวัน (Quest)
                            </button>

                            <button
                                onClick={() => setCurrentTab('portfolio')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'portfolio' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/10' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                            >
                                🎓 พอร์ตโฟลิโอ TCAS
                            </button>
                        </>
                    )}

                    {(userRole === 'parent' || userRole === 'teacher') && (
                        <div className="my-2 border-t border-slate-800 hidden md:block"></div>
                    )}

                    {userRole === 'parent' && (
                        <button
                            onClick={() => setCurrentTab('parent')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'parent' ? 'bg-pink-600 text-white shadow-md shadow-pink-500/10' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                        >
                            👨‍👩‍👧‍👦 รีพอร์ตผู้ปกครอง
                        </button>
                    )}

                    {userRole === 'teacher' && (
                        <button
                            onClick={() => setCurrentTab('teacher')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'teacher' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}
                        >
                            👨‍🏫 จัดการชั้นเรียน (ครู)
                        </button>
                    )}
                </aside>

                <section className="flex-1 min-w-0">

                    {/* 1. DASHBOARD TAB */}
                    {userRole === 'student' && currentTab === 'dashboard' && (
                        <div className="space-y-6">
                            <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-900/60 via-slate-900 to-indigo-950/60 border border-purple-500/20 shadow-xl relative overflow-hidden animate-fadeIn">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10"></div>
                                <h1 className="text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
                                    ยินดีต้อนรับสู่โลก Python! 🚀
                                </h1>
                                <p className="text-slate-300 text-sm max-w-xl">
                                    เรียนรู้และเขียนโปรแกรมไปพร้อมๆ กัน พัฒนาแอปพลิเคชันจากศูนย์ด้วยเทคนิคการทำงานของเครื่องแปลคำสั่ง (Interpreter) และเก็บคะแนนความท้าทายไว้ทำพอร์ตสวยงามยื่นเรียนต่อกันเลย
                                </p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <button
                                        onClick={() => setCurrentTab('learning')}
                                        className="px-5 py-2.5 bg-teal-400 text-slate-950 font-bold text-sm rounded-xl hover:bg-teal-300 transition-all shadow-lg shadow-teal-400/10"
                                    >
                                        เริ่มเส้นทางความรู้กันเลย {'->'}
                                    </button>
                                    <button
                                        onClick={() => setCurrentTab('challenges')}
                                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-sm rounded-xl transition-all"
                                    >
                                        ท้าทายโจทย์รายวัน
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 text-xl font-bold">🎯</div>
                                    <div>
                                        <span className="text-xs text-slate-400 block font-medium">คะแนนรวมสะสม</span>
                                        <span className="text-2xl font-black text-teal-400">{xp} XP</span>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xl font-bold">🎖️</div>
                                    <div>
                                        <span className="text-xs text-slate-400 block font-medium">Badges สกิลที่ได้รับ</span>
                                        <span className="text-base font-bold text-slate-200">
                                            {badges.length === 0 ? 'รอปลดล็อคบทแรก...' : badges.join(', ')}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl font-bold">🔥</div>
                                    <div>
                                        <span className="text-xs text-slate-400 block font-medium">สถานะแบบเรียน Labs</span>
                                        <span className="text-lg font-bold text-slate-200">
                                            {Object.values(completedLabs).filter(Boolean).length} / {LESSON_LABS.length} ด่านสำเร็จ
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                                <h3 className="text-lg font-bold text-slate-200 mb-4">🏆 หอเกียรติยศ (Badges Mastery)</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className={`p-4 rounded-xl border ${badges.includes('The Logic Master') ? 'bg-purple-950/20 border-purple-500/30' : 'bg-slate-950/40 border-slate-800/40 opacity-50'}`}>
                                        <div className="text-3xl mb-1">🦁</div>
                                        <h4 className="font-bold text-slate-200 text-sm">The Logic Master</h4>
                                        <p className="text-xs text-slate-400 mt-1">เข้าใจเรื่อง If-Else และการประเมินตรรกะใน Python อย่างถูกต้อง (ผ่าน Lab 4 เรื่อง Indentation)</p>
                                    </div>
                                    <div className={`p-4 rounded-xl border ${badges.includes('Function Wizard') ? 'bg-teal-950/20 border-teal-500/30' : 'bg-slate-950/40 border-slate-800/40 opacity-50'}`}>
                                        <div className="text-3xl mb-1">🧙‍♂️</div>
                                        <h4 className="font-bold text-slate-200 text-sm">Function Wizard</h4>
                                        <p className="text-xs text-slate-400 mt-1">เข้าใจการทำงานและการประกาศ Function ร่วมกับการส่งค่าด้วย Return (ผ่านถึง Lab 73)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. LEARNING ROADMAP TAB */}
                    {userRole === 'student' && currentTab === 'learning' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div>
                                <h2 className="text-2xl font-extrabold text-slate-100">🗺️ เส้นทางผู้กล้าลุย Python (Learning Roadmap)</h2>
                                <p className="text-slate-400 text-sm mt-1">ระบบจะล็อคบทเรียนให้ท้าทายตามขั้นตอนเพื่อไม่ให้น้องๆ ข้ามไปทำสิ่งที่ยากจนท้อใจก่อนครับ</p>
                            </div>

                            <div className="relative border-l border-slate-800 pl-6 ml-4 space-y-8">
                                {LESSON_LABS.map((lab, index) => {
                                    const isDone = completedLabs[lab.id];
                                    const isUnlocked = index === 0 || completedLabs[LESSON_LABS[index - 1].id];

                                    return (
                                        <div key={lab.id} className="relative group">
                                            <span className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 ${isDone ? 'bg-teal-400 border-teal-400 shadow-lg shadow-teal-400/20' : isUnlocked ? 'bg-slate-900 border-purple-500 animate-pulse' : 'bg-slate-950 border-slate-800'}`}></span>

                                            <div className={`p-5 rounded-2xl border transition-all ${isDone ? 'bg-slate-900/60 border-teal-500/20' : isUnlocked ? 'bg-slate-900 border-purple-500/30 hover:border-purple-500/50' : 'bg-slate-950/60 border-slate-900 opacity-60'}`}>
                                                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                    <span className="text-xxs uppercase tracking-wider font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                                                        {lab.category}
                                                    </span>
                                                    <span className="text-xs text-slate-500 font-mono">อ้างอิง: {lab.slideRef}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-200">{lab.title}</h3>
                                                <p className="text-sm text-slate-400 mt-1">{lab.description}</p>

                                                <div className="mt-4 flex items-center justify-between">
                                                    {isUnlocked ? (
                                                        <button
                                                            onClick={() => { selectLab(index); setCurrentTab('editor'); }}
                                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isDone ? 'bg-slate-800 hover:bg-slate-700 text-teal-300' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}
                                                        >
                                                            {isDone ? 'ย้อนกลับไปซ้อมข้อนี้ ↺' : 'ท้าทายตอนนี้เลย 🚀'}
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                                            🔒 ต้องทำด่านก่อนหน้านี้ให้สำเร็จก่อนนะ
                                                        </div>
                                                    )}

                                                    {isDone && (
                                                        <span className="text-teal-400 text-xs font-bold flex items-center gap-1">
                                                            ✓ สำเร็จเรียบร้อย (+100 XP)
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* 3. CODE EDITOR & AUTO GRADER TAB */}
                    {userRole === 'student' && currentTab === 'editor' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
                            <div className="lg:col-span-4 space-y-4">
                                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-semibold bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full">
                                            {LESSON_LABS[selectedLabIndex].category}
                                        </span>
                                        <span className="text-xs text-slate-500 font-mono">{LESSON_LABS[selectedLabIndex].slideRef}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-200">{LESSON_LABS[selectedLabIndex].title}</h2>
                                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                                        {LESSON_LABS[selectedLabIndex].description}
                                    </p>
                                    <div className="mt-4 p-3 bg-purple-950/30 rounded-xl border border-purple-500/10">
                                        <span className="text-xs text-purple-300 font-bold">👉 คำชี้แจงโจทย์:</span>
                                        <p className="text-xs text-slate-300 mt-1">{LESSON_LABS[selectedLabIndex].instruction}</p>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">🤖</span>
                                            <h3 className="font-bold text-slate-200 text-sm">AI Code Mentor</h3>
                                        </div>
                                        <span className="text-xxs bg-emerald-500/10 text-emerald-400 px-2 rounded-full">เปิดทำการ 24 ชม.</span>
                                    </div>

                                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                                        พี่เมนเทอร์จะไม่เฉลยการบ้านทันที แต่จะดึงเนื้อหาในสไลด์และบอกใบ้เพื่อให้คิดตามได้อย่างมีระบบ!
                                    </p>

                                    <button
                                        onClick={askAiMentor}
                                        disabled={isAiLoading}
                                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-indigo-600/10 disabled:opacity-50"
                                    >
                                        {isAiLoading ? 'กำลังส่งโค้ดให้พี่เมนเทอร์อ่าน...' : '💬 ขอคำแนะนำจากพี่ AI Mentor'}
                                    </button>

                                    {aiErrorMsg && (
                                        <p className="text-xxs text-amber-500 mt-2 bg-amber-500/10 p-2 rounded">{aiErrorMsg}</p>
                                    )}

                                    {aiResponse && (
                                        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 animate-slideDown">
                                            <span className="text-xxs text-indigo-400 font-bold uppercase block mb-1">พี่เมนเทอร์แนะนำว่า:</span>
                                            <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{aiResponse}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="lg:col-span-8 space-y-4">
                                <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col shadow-xl">
                                    <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-slate-800/80">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                                            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                                            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                            <span className="text-xs text-slate-400 ml-2 font-mono">sandbox.py</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={indentGuides}
                                                    onChange={() => setIndentGuides(!indentGuides)}
                                                    className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
                                                />
                                                Indentation Visualizer
                                            </label>
                                        </div>
                                    </div>

                                    <div className="relative flex flex-1 min-h-[250px] font-mono text-sm leading-relaxed p-4 bg-slate-950">
                                        {indentGuides && (
                                            <div className="absolute inset-0 pointer-events-none opacity-25 flex">
                                                <div className="w-[52px] border-r border-slate-800"></div>
                                                <div className="w-8 border-r border-purple-500/40"></div>
                                                <div className="w-8 border-r border-teal-500/40"></div>
                                                <div className="w-8 border-r border-pink-500/40"></div>
                                            </div>
                                        )}

                                        <div className="text-slate-600 text-right pr-4 select-none w-8">
                                            {editorCode.split('\n').map((_, i) => (
                                                <div key={i} className="h-6 flex items-center justify-end">
                                                    {i + 1}
                                                </div>
                                            ))}
                                        </div>

                                        <textarea
                                            value={editorCode}
                                            onChange={(e) => setEditorCode(e.target.value)}
                                            spellCheck="false"
                                            className="flex-1 bg-transparent text-slate-100 focus:outline-none resize-none font-mono h-[250px] leading-6 z-10 whitespace-pre"
                                        />
                                    </div>

                                    <div className="bg-slate-950/60 px-4 py-2 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                                        <span className="text-xxs text-slate-500 mr-2 font-semibold">ปุ่มลัดพิมพ์ง่าย:</span>
                                        <button onClick={() => setEditorCode(p => p + '    ')} className="px-2.5 py-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded font-mono text-xs text-slate-300">Tab (เว้นวรรค)</button>
                                        <button onClick={() => setEditorCode(p => p + ':')} className="px-2 py-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded font-mono text-xs text-slate-300">:</button>
                                        <button onClick={() => setEditorCode(p => p + '()')} className="px-2 py-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded font-mono text-xs text-slate-300">( )</button>
                                        <button onClick={() => setEditorCode(p => p + '[]')} className="px-2 py-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded font-mono text-xs text-slate-300">[ ]</button>
                                        <button onClick={() => setEditorCode(p => p + '""')} className="px-2 py-1 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded font-mono text-xs text-slate-300">" "</button>
                                        <button onClick={() => setEditorCode(p => p + 'def ')} className="px-2 py-1 bg-purple-950 border border-purple-900 text-purple-300 hover:bg-purple-900 rounded font-mono text-xs">def</button>
                                        <button onClick={() => setEditorCode(p => p + 'for ')} className="px-2 py-1 bg-teal-950 border border-teal-300 hover:bg-teal-900 rounded font-mono text-xs">for</button>
                                        <button onClick={() => setEditorCode(p => p + 'if ')} className="px-2 py-1 bg-indigo-950 border border-indigo-900 text-indigo-300 hover:bg-indigo-900 rounded font-mono text-xs">if</button>
                                    </div>

                                    <div className="p-4 bg-slate-900/40 border-t border-slate-800 flex flex-wrap gap-3 items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={runCode}
                                                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10 flex items-center gap-1.5 text-sm"
                                            >
                                                ⚡ รันเพื่อตรวจคะแนน
                                            </button>

                                            <button
                                                onClick={handleNextStep}
                                                className="px-4 py-2.5 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/20 font-semibold rounded-xl transition-all text-xs flex items-center gap-1.5"
                                            >
                                                ⏱️ Trace ทีละขั้นตอน
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => setEditorCode(LESSON_LABS[selectedLabIndex].template)}
                                            className="text-xs text-slate-500 hover:text-slate-300 underline"
                                        >
                                            รีเซ็ตโค้ดเดิม ↺
                                        </button>
                                    </div>
                                </div>

                                {/* VISUAL TRACER DISPLAY CONTAINER */}
                                {(isTracing || currentTraceStepIndex !== -1) && (
                                    <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 shadow-xl space-y-4 animate-fadeIn">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                                                🧠 ตัวจำลองหน่วยความจำ (Visual Memory Tracer)
                                            </h3>
                                            <button
                                                onClick={() => { setIsTracing(false); setCurrentTraceStepIndex(-1); }}
                                                className="text-xs text-slate-500 hover:text-slate-300"
                                            >
                                                ปิดตัวจำลอง ×
                                            </button>
                                        </div>

                                        {currentTraceStepIndex !== -1 && traceSteps[currentTraceStepIndex] ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <span className="text-xxs text-indigo-400 font-bold uppercase block mb-1">คำสั่งที่กำลังถูกประมวลผล (Line {traceSteps[currentTraceStepIndex].lineIndex + 1}):</span>
                                                    <div className="font-mono text-xs text-slate-200 bg-slate-950 p-2 rounded border border-slate-800 mt-1">
                                                        {traceSteps[currentTraceStepIndex].text}
                                                    </div>
                                                    <p className="text-xs text-slate-400 mt-2 italic">
                                                        💡 {traceSteps[currentTraceStepIndex].comment}
                                                    </p>
                                                </div>

                                                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                                                    <span className="text-xxs text-teal-400 font-bold uppercase block mb-1">ตัวแปรและข้อมูลในหน่วยความจำ (Memory State):</span>
                                                    {Object.keys(traceSteps[currentTraceStepIndex].vars).length === 0 ? (
                                                        <p className="text-xs text-slate-500 italic mt-2">ยังไม่มีการจองที่อยู่ให้ตัวแปรใดๆ</p>
                                                    ) : (
                                                        <div className="space-y-2 mt-2">
                                                            {Object.entries(traceSteps[currentTraceStepIndex].vars).map(([name, val]) => (
                                                                <div key={name} className="flex justify-between items-center text-xs bg-slate-950 p-1.5 rounded border border-slate-800">
                                                                    <span className="font-mono text-indigo-300 font-bold">{name}</span>
                                                                    <span className="font-mono text-teal-400">{val}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-xs text-slate-400">กดปุ่ม **Trace ทีละขั้นตอน** เพื่อเริ่มต้นเฝ้ามองทีละบรรทัดได้ทันที!</p>
                                        )}
                                    </div>
                                )}

                                {/* TERMINAL OUTPUT BOX */}
                                <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                                    <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 text-xs text-slate-400 font-bold">
                                        📟 คอนโซลผลลัพธ์ (Terminal Output)
                                    </div>
                                    <pre className="p-4 bg-slate-950 font-mono text-xs text-slate-300 min-h-[100px] whitespace-pre-wrap">
                                        {terminalOutput || 'ยินดีต้อนรับสู่เทอร์มินัล! ลองเขียนโค้ดแล้วกดรันดูผลลัพธ์ตรงนี้นะครับ'}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4. DAILY CHALLENGES TAB */}
                    {userRole === 'student' && currentTab === 'challenges' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="p-6 bg-gradient-to-r from-teal-900/50 via-slate-900 to-indigo-950/40 border border-teal-500/20 rounded-2xl">
                                <span className="text-xxs uppercase tracking-wider font-extrabold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">เควสต์พิเศษประจำวัน</span>
                                <h2 className="text-2xl font-black mt-2 text-slate-100">🔥 เควสต์ประจำวัน: ตะลุยด่าน Multiplication Table</h2>
                                <p className="text-slate-400 text-sm mt-1">เขียนฟังก์ชันคำนวณหาสูตรคูณให้ทันเวลา เพื่อคว้ารางวัลแต้มพิเศษ +250 XP!</p>

                                {dailyCompleted ? (
                                    <div className="mt-4 p-4 rounded-xl bg-teal-950/40 border border-teal-500/20 text-teal-300 text-sm font-bold">
                                        🎉 สำเร็จเควสต์ประจำวันนี้เรียบร้อย! รับทันที +250 XP
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setSelectedLabIndex(4);
                                            setCurrentTab('editor');
                                        }}
                                        className="mt-4 px-5 py-2.5 bg-teal-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-teal-300 transition-all shadow-md"
                                    >
                                        เริ่มท้าทายเวลา 🧭
                                    </button>
                                )}
                            </div>

                            {/* PEER REVIEW GUILD SYSTEM */}
                            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                                <h3 className="text-lg font-bold text-slate-200 mb-2">🤝 สมาพันธ์ผู้กล้า (Peer Review Guild)</h3>
                                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                                    ช่วยตรวจและรีวิวโค้ดให้เพื่อนๆ ที่ทำงานส่งแล้ว คุณจะได้ฝึกการอ่านโค้ดของผู้อื่น และเมื่อคุณให้ฟีดแบ็กสร้างสรรค์ คุณจะได้รับโบนัส +50 XP ทันที!
                                </p>

                                <div className="space-y-4">
                                    {peerReviews.map((peer, idx) => (
                                        <div key={peer.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-semibold text-slate-200">{peer.author}</span>
                                                <span className="text-xxs bg-purple-500/10 text-purple-400 px-2 rounded-full font-mono">{peer.labName}</span>
                                            </div>

                                            <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-300 mb-3 overflow-x-auto whitespace-pre">
                                                {peer.code}
                                            </pre>

                                            {peer.checked ? (
                                                <div className="text-xs text-teal-400 font-bold">✓ คุณให้ความเห็นเพื่อนแล้ว (+50 XP)</div>
                                            ) : (
                                                <div className="space-y-3">
                                                    <input
                                                        type="text"
                                                        placeholder="พิมพ์คำชมหรือคำแนะนำดีๆ ให้เพื่อนที่นี่ (ระบบมีเซ็นเซอร์กรองคำหยาบ)..."
                                                        value={peer.feedback}
                                                        onChange={(e) => {
                                                            const updated = [...peerReviews];
                                                            updated[idx].feedback = e.target.value;
                                                            setPeerReviews(updated);
                                                        }}
                                                        className="w-full text-xs bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 focus:outline-none focus:border-purple-500 text-slate-200"
                                                    />
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xxs text-slate-500">กรุณาแสดงความคิดเห็นแบบเป็นมิตร</span>
                                                        <button
                                                            onClick={() => {
                                                                const updated = [...peerReviews];
                                                                updated[idx].checked = true;
                                                                setPeerReviews(updated);
                                                                setXp(p => p + 50);
                                                            }}
                                                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xxs font-bold"
                                                        >
                                                            ส่งรีวิวและให้หัวใจ ❤️
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 5. PORTFOLIO & TCAS DOWNLOAD TAB */}
                    {userRole === 'student' && currentTab === 'portfolio' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
                                <span className="text-5xl">🎓</span>
                                <h2 className="text-2xl font-black text-slate-100">พอร์ตโฟลิโอส่งผลงานเข้ามหาวิทยาลัย (TCAS Portfolio)</h2>
                                <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
                                    รวบรวมประวัติการเรียน ผลงานการทำแล็บ และโค้ดทั้งหมดที่เขียนเสรียบร้อยแล้วไปเขียนเป็นหน้าเว็บพอร์ตโฟลิโอส่วนตัวแบบ Interactive ที่สวยงามและสามารถยื่นใช้ในการคัดเลือกเข้าเรียนต่อได้จริง
                                </p>

                                <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-left">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-400">ชื่อโปรเจกต์ของฉัน:</span>
                                        <span className="text-xs text-slate-200 font-semibold">Python DIC Basic Project Portfolio</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-slate-400">แล็บที่ทำสำเร็จแล้ว:</span>
                                        <span className="text-xs text-teal-400 font-bold">
                                            {Object.values(completedLabs).filter(Boolean).length} / {LESSON_LABS.length} ด่าน
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={generatePortfolioHtml}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-500 hover:to-teal-400 text-white font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-purple-500/20"
                                >
                                    🚀 ดาวน์โหลดพอร์ต Web Portfolio (.html)
                                </button>
                                <p className="text-xxs text-slate-500">หมายเหตุ: ระบบจะแปลงผลงานทุกชิ้นเป็นรหัสโค้ดหน้าเว็บแบบ HTML ที่เปิดใช้งานและแต่งองค์ทรงเครื่องพร้อมใช้ทันที</p>
                            </div>
                        </div>
                    )}

                    {/* 6. PARENT DASHBOARD TAB (SKILL RADAR CHART) */}
                    {userRole === 'parent' && currentTab === 'parent' && (() => {
                        const radarData = [
                            { label: 'ตรรกะ (Logic)', value: completedLabs['syntax-lab'] ? 95 : 45 },
                            { label: 'ตัวแปร (Variables)', value: completedLabs['variables-lab'] ? 85 : 50 },
                            { label: 'ฟังก์ชัน (Functions)', value: completedLabs['lab-71'] ? 80 : 35 },
                            { label: 'แก้ปัญหา (Problem Solving)', value: xp > 100 ? 90 : 40 },
                            { label: 'ความพยายาม (Consistency)', value: Math.max(40, Object.values(completedLabs).filter(Boolean).length * 20) }
                        ];

                        const size = 320;
                        const center = size / 2;
                        const radius = size / 2 - 50;
                        const levels = [0.2, 0.4, 0.6, 0.8, 1];
                        const angles = radarData.map((_, i) => -Math.PI / 2 + (Math.PI * 2 * i) / radarData.length);

                        const getPoint = (val, angle) => {
                            const r = radius * (val / 100);
                            return (center + r * Math.cos(angle)) + ',' + (center + r * Math.sin(angle));
                        };

                        return (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="p-8 rounded-2xl bg-gradient-to-r from-pink-950/40 via-slate-900 to-rose-950/40 border border-pink-500/20 shadow-xl">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-4xl">👨‍👩‍👧‍👦</span>
                                        <div>
                                            <h2 className="text-2xl font-black text-pink-400">รายงานสำหรับผู้ปกครอง (Skill Radar)</h2>
                                            <p className="text-slate-400 text-sm">กราฟวิเคราะห์ทักษะเชิงลึก เพื่อให้ผู้ปกครองให้คำชมเชยและสนับสนุนน้องๆ ได้ถูกจุด!</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col lg:flex-row items-center gap-8 bg-slate-950/50 p-6 rounded-xl border border-slate-800">
                                        <div className="relative w-[320px] h-[320px] shrink-0">
                                            <svg width={size} height={size} className="overflow-visible">
                                                {levels.map(level => (
                                                    <polygon
                                                        key={level}
                                                        points={angles.map(angle => getPoint(level * 100, angle)).join(' ')}
                                                        fill="none"
                                                        stroke="#334155"
                                                        strokeWidth="1"
                                                        strokeDasharray="4 4"
                                                    />
                                                ))}
                                                {angles.map((angle, i) => (
                                                    <line
                                                        key={i}
                                                        x1={center} y1={center}
                                                        x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)}
                                                        stroke="#334155" strokeWidth="1"
                                                    />
                                                ))}
                                                <polygon
                                                    points={radarData.map((d, i) => getPoint(d.value, angles[i])).join(' ')}
                                                    fill="rgba(236, 72, 153, 0.3)"
                                                    stroke="#ec4899"
                                                    strokeWidth="2.5"
                                                />
                                                {radarData.map((d, i) => {
                                                    const px = center + radius * (d.value / 100) * Math.cos(angles[i]);
                                                    const py = center + radius * (d.value / 100) * Math.sin(angles[i]);
                                                    const lx = center + (radius + 25) * Math.cos(angles[i]);
                                                    const ly = center + (radius + 25) * Math.sin(angles[i]);
                                                    return (
                                                        <g key={i}>
                                                            <circle cx={px} cy={py} r="5" fill="#f472b6" className="drop-shadow-lg" />
                                                            <text x={lx} y={ly} fill="#cbd5e1" fontSize="12" textAnchor="middle" dominantBaseline="middle" className="font-sans font-semibold">
                                                                {d.label}
                                                            </text>
                                                        </g>
                                                    );
                                                })}
                                            </svg>
                                        </div>

                                        <div className="flex-1 space-y-4 w-full">
                                            <h3 className="font-bold text-slate-200 text-lg border-b border-slate-800 pb-2">💡 จุดเด่นของน้องวันนี้</h3>
                                            <div className="space-y-3">
                                                <div className="bg-slate-900 p-3 rounded-lg border-l-4 border-pink-500">
                                                    <span className="text-sm font-bold text-pink-400">ตรรกะและการคิดเป็นระบบ (Logic)</span>
                                                    <p className="text-xs text-slate-400 mt-1">
                                                        {completedLabs['syntax-lab'] ? 'ยอดเยี่ยม! น้องเข้าใจการใช้เงื่อนไข If-Else และเรื่องการจัดบล็อกคำสั่ง (Indentation) ได้อย่างถูกต้อง' : 'น้องกำลังเริ่มต้นเรียนรู้การคิดอย่างเป็นเหตุเป็นผล ให้กำลังใจน้องในการทำ Lab 4 นะครับ'}
                                                    </p>
                                                </div>
                                                <div className="bg-slate-900 p-3 rounded-lg border-l-4 border-purple-500">
                                                    <span className="text-sm font-bold text-purple-400">การแก้ปัญหา (Problem Solving)</span>
                                                    <p className="text-xs text-slate-400 mt-1">
                                                        {xp > 100 ? 'น่าประทับใจ! น้องสามารถเผชิญหน้ากับข้อผิดพลาดของโปรแกรม (Bugs) และหาทางแก้ไขจนสำเร็จด้วยตัวเอง' : 'น้องมีความกล้าที่จะทดลองรันโค้ดและกำลังเรียนรู้จากข้อผิดพลาดทีละนิด'}
                                                    </p>
                                                </div>
                                                <div className="bg-slate-900 p-3 rounded-lg border-l-4 border-teal-500">
                                                    <span className="text-sm font-bold text-teal-400">ฟังก์ชันและการสร้างเครื่องมือ (Functions)</span>
                                                    <p className="text-xs text-slate-400 mt-1">
                                                        {completedLabs['lab-71'] ? 'เก่งมาก! น้องเริ่มประยุกต์ชุดคำสั่งให้ทำงานซ้ำได้เองแล้ว ถือเป็นพื้นฐานของ Programmer ที่ดี' : 'เนื้อหาฟังก์ชันในบทหลังๆ จะเป็นความท้าทายใหม่ที่สนุกสำหรับน้องเมื่อทำถึงครับ'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* 7. TEACHER ANALYTICS TAB (WITH STUDENT TRACKING & RADAR COMPARE) */}
                    {userRole === 'teacher' && currentTab === 'teacher' && (() => {
                        const activeStudent = studentList.find(s => s.id === selectedStudentId) || studentList[0];

                        // คำนวณความสำเร็จแล็บของห้องเรียน
                        const classStats = [
                            { id: 'syntax-lab', title: 'Lab 4: การย่อหน้า (If-Else)', passRate: 95, stuck: 2, total: 40 },
                            { id: 'variables-lab', title: 'Lab 10: ตัวแปรและประเภทข้อมูล', passRate: 88, stuck: 4, total: 40 },
                            { id: 'lab-71', title: 'Lab 71: ผลรวมด้วย Function', passRate: 75, stuck: 8, total: 40 },
                            { id: 'lab-72', title: 'Lab 72: หาผลรวมจำนวนคู่', passRate: 25, stuck: 25, total: 40, isBottleneck: true },
                            { id: 'lab-73', title: 'Lab 73: สูตรคูณแม่ N (Loops)', passRate: 15, stuck: 10, total: 40 },
                        ];

                        // ข้อมูลเปรียบเทียบเรดาร์ชาร์ต (นักเรียนที่เลือก VS ค่าเฉลี่ยชั้นเรียน)
                        const radarKeys = [
                            { key: 'logic', label: 'ตรรกะ (Logic)' },
                            { key: 'variables', label: 'ตัวแปร (Variables)' },
                            { key: 'functions', label: 'ฟังก์ชัน (Functions)' },
                            { key: 'problemSolving', label: 'แก้ปัญหา (Problem Solving)' },
                            { key: 'consistency', label: 'ความพยายาม (Consistency)' }
                        ];

                        const size = 280;
                        const center = size / 2;
                        const radius = size / 2 - 40;
                        const levels = [0.2, 0.6, 1.0];
                        const angles = radarKeys.map((_, i) => -Math.PI / 2 + (Math.PI * 2 * i) / radarKeys.length);

                        const getPoint = (val, angle) => {
                            const r = radius * (val / 100);
                            return (center + r * Math.cos(angle)) + ',' + (center + r * Math.sin(angle));
                        };

                        return (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-4xl">👨‍🏫</span>
                                        <div>
                                            <h2 className="text-2xl font-black text-blue-400">ระบบติดตามและประเมินทักษะของชั้นเรียน</h2>
                                            <p className="text-slate-400 text-sm">เครื่องมือวิเคราะห์ระดับชั้น ตรวจสอบโค้ด และติดตามความคืบหน้าของเด็กรายบุคคล</p>
                                        </div>
                                    </div>
                                </div>

                                {/* ROW 1: CLASS OVERVIEW & CLASS AVERAGE RADAR */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    {/* Alert Bottleneck */}
                                    <div className="lg:col-span-7 bg-blue-950/30 border border-blue-500/20 rounded-2xl p-5 space-y-4">
                                        <div className="flex items-start gap-3">
                                            <span className="text-2xl">⚠️</span>
                                            <div>
                                                <h3 className="font-bold text-slate-200 text-sm">วิเคราะห์คอขวดการเรียนรู้ (Class Bottleneck)</h3>
                                                <p className="text-xs text-slate-400 mt-1">
                                                    นักเรียนส่วนใหญ่ (<span className="text-amber-400 font-bold">25 คน หรือ 62%</span>) ใช้เวลากับการทำ <span className="text-slate-200 font-semibold">Lab 72 (ผลรวมเลขคู่)</span> นานกว่าด่านอื่นๆ
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                                            <span className="text-blue-400 font-bold">💡 ข้อเสนอแนะการสอน (AI Guide):</span>
                                            <p className="mt-1 leading-relaxed text-slate-400">
                                                นักเรียนมักสับสนการผสมผสานเงื่อนไข <code className="bg-slate-900 px-1 py-0.5 rounded text-indigo-300">if i % 2 == 0</code> ซ้อนเข้าไปในโครงสร้างลูป <code className="bg-slate-900 px-1 py-0.5 rounded text-teal-300">for</code> (สไลด์หน้า 193) แนะนำให้ทบทวนเรื่องการคำนวณเอาเศษ (Modulo) บนกระดานพร้อมกันครับ
                                            </p>
                                        </div>

                                        <div className="space-y-2 pt-2">
                                            <span className="text-xxs text-slate-500 uppercase font-bold block">เปอร์เซ็นต์ผ่านการประเมิน (Class Pass Rates):</span>
                                            {classStats.map(stat => (
                                                <div key={stat.id} className="flex items-center gap-3 text-xxs">
                                                    <span className="w-44 text-slate-400 truncate">{stat.title}</span>
                                                    <div className="flex-1 h-2 bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
                                                        <div className="bg-blue-500 h-full" style={{ width: `${stat.passRate}%` }}></div>
                                                        <div className="bg-amber-500/50 h-full" style={{ width: `${(stat.stuck / stat.total) * 100}%` }}></div>
                                                    </div>
                                                    <span className="text-slate-500 w-16 text-right">{stat.passRate}% สำเร็จ</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Class Average Skill Radar */}
                                    <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                                        <span className="text-xxs text-blue-400 font-bold uppercase tracking-wider block mb-2">Class Skill Average (เรดาร์ภาพรวมทั้งห้อง)</span>
                                        <svg width={size} height={size} className="overflow-visible mx-auto">
                                            {levels.map(level => (
                                                <polygon
                                                    key={level}
                                                    points={angles.map(angle => getPoint(level * 100, angle)).join(' ')}
                                                    fill="none"
                                                    stroke="#1e293b"
                                                    strokeWidth="1.5"
                                                    strokeDasharray="3 3"
                                                />
                                            ))}
                                            {angles.map((angle, i) => (
                                                <line
                                                    key={i}
                                                    x1={center} y1={center}
                                                    x2={center + radius * Math.cos(angle)} y2={center + radius * Math.sin(angle)}
                                                    stroke="#1e293b" strokeWidth="1"
                                                />
                                            ))}
                                            {/* Class Average Shape */}
                                            <polygon
                                                points={radarKeys.map((key, i) => getPoint(CLASS_AVERAGE_SKILLS[key.key], angles[i])).join(' ')}
                                                fill="rgba(59, 130, 246, 0.15)"
                                                stroke="#3b82f6"
                                                strokeWidth="2"
                                                strokeDasharray="2 2"
                                            />
                                            {radarKeys.map((key, i) => {
                                                const lx = center + (radius + 20) * Math.cos(angles[i]);
                                                const ly = center + (radius + 15) * Math.sin(angles[i]);
                                                return (
                                                    <text key={i} x={lx} y={ly} fill="#94a3b8" fontSize="10" textAnchor="middle" dominantBaseline="middle" className="font-semibold">
                                                        {key.label} ({CLASS_AVERAGE_SKILLS[key.key]}%)
                                                    </text>
                                                );
                                            })}
                                        </svg>
                                    </div>
                                </div>

                                {/* ROW 2: INDIVIDUAL STUDENT TRACKER (CRITICAL NEW TOOL) */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    {/* Left Column: Student List */}
                                    <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                                        <span className="text-xs font-bold text-slate-200 block mb-2 px-1">🧑‍🎓 สมาชิกในชั้นเรียน ({studentList.length} คน)</span>
                                        <div className="space-y-2">
                                            {studentList.map(student => {
                                                const doneCount = Object.values(student.completedMap || {}).filter(Boolean).length;
                                                const isSelected = student.id === selectedStudentId;
                                                return (
                                                    <div
                                                        key={student.id}
                                                        onClick={() => {
                                                            setSelectedStudentId(student.id);
                                                            setTeacherFeedbackInput('');
                                                        }}
                                                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${isSelected ? 'bg-blue-600/10 border-blue-500' : 'bg-slate-950 border-slate-800/60 hover:bg-slate-950/80 hover:border-slate-700'}`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-2xl">{student.avatar || '🧑‍💻'}</span>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="text-sm font-bold text-slate-200 truncate">{student.name}</h4>
                                                                <div className="flex justify-between items-center text-xxs text-slate-500 mt-1">
                                                                    <span>🔥 {student.xp || 0} XP</span>
                                                                    <span className="text-teal-400 font-semibold">สำเร็จแล้ว {doneCount}/8 ด่าน</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Right Column: Detailed Tracking Profile & Live Code Review */}
                                    <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl">{activeStudent?.avatar || '🧑‍💻'}</span>
                                                <div>
                                                    <h3 className="font-bold text-lg text-slate-100">{activeStudent?.name || 'กรุณาเลือกนักเรียน'}</h3>
                                                    <p className="text-xs text-slate-500">ผลงานล่าสุดและเรดาร์ประเมินเปรียบเทียบเพื่อช่วยเหลือ</p>
                                                </div>
                                            </div>
                                            <span className="text-xs bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full font-bold">
                                                ระดับประพฤติกรรมความต่อเนื่อง: {activeStudent?.consistency || 0}%
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                            {/* Student Radar Chart Compared to Class Average */}
                                            <div className="md:col-span-5 flex flex-col items-center">
                                                <span className="text-xxs text-pink-400 font-bold uppercase tracking-wider block mb-2">เปรียบเทียบทักษะรายบุคคล</span>
                                                <div className="relative w-[220px] h-[220px]">
                                                    <svg width={220} height={220} className="overflow-visible mx-auto">
                                                        {levels.map(level => (
                                                            <polygon
                                                                key={level}
                                                                points={angles.map(angle => getPoint(level * 100 * 0.7, angle)).join(' ')}
                                                                fill="none"
                                                                stroke="#1e293b"
                                                                strokeWidth="1"
                                                                strokeDasharray="3 3"
                                                            />
                                                        ))}
                                                        {/* Class Average Reference in Teacher Panel (Light Blue dotted) */}
                                                        <polygon
                                                            points={radarKeys.map((key, i) => getPoint(CLASS_AVERAGE_SKILLS[key.key] * 0.7, angles[i])).join(' ')}
                                                            fill="none"
                                                            stroke="rgba(59, 130, 246, 0.4)"
                                                            strokeWidth="1.5"
                                                            strokeDasharray="2 2"
                                                        />
                                                        {/* Student Real Skill Shape */}
                                                        {activeStudent && activeStudent.skills && (
                                                            <polygon
                                                                points={radarKeys.map((key, i) => getPoint(activeStudent.skills[key.key] * 0.7, angles[i])).join(' ')}
                                                                fill="rgba(236, 72, 153, 0.15)"
                                                                stroke="#ec4899"
                                                                strokeWidth="2"
                                                            />
                                                        )}
                                                        {radarKeys.map((key, i) => {
                                                            const lx = center + (radius * 0.7 + 15) * Math.cos(angles[i]);
                                                            const ly = center + (radius * 0.7 + 10) * Math.sin(angles[i]);
                                                            return (
                                                                <text key={i} x={lx} y={ly} fill="#94a3b8" fontSize="8" textAnchor="middle" dominantBaseline="middle" className="font-semibold">
                                                                    {key.label}
                                                                </text>
                                                            );
                                                        })}
                                                    </svg>
                                                </div>
                                                <div className="mt-2 flex gap-3 text-xxs">
                                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-500/40"></span> ค่าเฉลี่ยห้อง</span>
                                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-pink-500"></span> {activeStudent?.name?.split(' ')[0] || 'นักเรียน'}</span>
                                                </div>
                                            </div>

                                            {/* Completed/Incomplete Labs Breakdown */}
                                            <div className="md:col-span-7 space-y-4">
                                                <span className="text-xxs text-slate-500 font-bold uppercase block">สถานะความก้าวหน้ารายด่าน (Completed Labs):</span>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {LESSON_LABS.map(lab => {
                                                        const isDone = activeStudent?.completedMap?.[lab.id] || false;
                                                        return (
                                                            <div key={lab.id} className={`p-2 rounded-xl border flex items-center justify-between text-xxs ${isDone ? 'bg-teal-950/30 border-teal-500/20 text-teal-300' : 'bg-slate-950 border-slate-900 text-slate-500'}`}>
                                                                <span className="truncate pr-1">{lab.title.split(': ')[1]}</span>
                                                                <span>{isDone ? '🗸' : '🔒'}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* LIVE CODE SUBMITTED */}
                                        <div className="space-y-2">
                                            <span className="text-xxs text-slate-400 font-bold uppercase block">⌨️ โค้ดส่งงานล่าสุดของนักเรียน (Student Last Submitted Code):</span>
                                            <pre className="p-4 bg-slate-950 rounded-xl font-mono text-xs text-teal-400 overflow-x-auto border border-slate-800 max-h-40 whitespace-pre">
                                                {activeStudent?.latestCode || '# นักเรียนยังไม่ได้ส่งงานในด่านนี้'}
                                            </pre>
                                        </div>

                                        {/* FEEDBACK SYSTEM FOR THIS STUDENT */}
                                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                                            <span className="text-xs text-blue-400 font-bold block">✍️ กล่องข้อเสนอแนะและตรวจประเมินของครู:</span>
                                            {activeStudent?.feedbackFromTeacher ? (
                                                <div className="p-3 bg-blue-950/20 border border-blue-500/10 text-xs text-slate-300 rounded-lg">
                                                    <span className="text-blue-400 font-bold block mb-1">ความเห็นที่บันทึกแล้ว:</span>
                                                    "{activeStudent.feedbackFromTeacher}"
                                                    <button
                                                        onClick={() => {
                                                            setStudentList(prev => prev.map(s => s.id === activeStudent.id ? { ...s, feedbackFromTeacher: '' } : s));
                                                        }}
                                                        className="text-xxs text-slate-500 hover:text-red-400 underline block mt-2"
                                                    >
                                                        แก้ไขคำแนะนำ
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="พิมพ์คำแนะนำ หรือประเด็นที่น้องควรแก้ไขในสไลด์..."
                                                        value={teacherFeedbackInput}
                                                        onChange={(e) => setTeacherFeedbackInput(e.target.value)}
                                                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg text-xs py-2 px-3 focus:outline-none focus:border-blue-500 text-slate-200"
                                                    />
                                                    <button
                                                        onClick={() => handleSendFeedback(activeStudent?.id)}
                                                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 rounded-lg transition-all"
                                                    >
                                                        บันทึกโน้ต
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                </section>
            </main>

            {/* --- FOOTER --- */}
            <footer className="border-t border-slate-900 bg-slate-950 py-6 mt-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>© 2026 DIC Python LMS Platform. พัฒนาขึ้นมาเพื่อปรับปรุงทักษะการเรียนรู้ของเยาวชนไทยอย่างสร้างสรรค์</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-slate-400">นโยบายความเป็นส่วนตัว</a>
                        <a href="#" className="hover:text-slate-400">คู่มือติดตั้งฟรี</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}