import React, { useState, useEffect } from 'react';

// --- หมวดหมู่บทเรียน 6 บท (Chapters) ---
const CHAPTERS = [
    "บทที่ 1: พื้นฐานคำสั่ง (Basic Syntax)",
    "บทที่ 2: ตัวแปรและการคำนวณ (Variables)",
    "บทที่ 3: ตรรกะและเงื่อนไข (If-Else)",
    "บทที่ 4: การวนซ้ำ (Loops)",
    "บทที่ 5: ฟังก์ชันชั้นสูง (Functions & Algorithms)",
    "บทที่ 6: ตะลุยโจทย์ TOI-Zero (Olympic Pre-Camp)"
];

// --- รายการโจทย์ Lab 60 ด่าน (6 บทเรียน x 10 ด่าน) พร้อมเนื้อหาความรู้ ---
const LESSON_LABS = [
    // --- บทที่ 1: Basic Syntax (10 ด่าน) ---
    {
        id: 'b-01', category: CHAPTERS[0], title: 'Lab 1: จุดเริ่มต้น (Hello World)',
        lessonContent: 'คำสั่ง `print()` เป็นฟังก์ชันพื้นฐานที่สุดในภาษา Python ที่ใช้สำหรับแสดงผลลัพธ์ข้อความออกทางหน้าจอ โดยข้อความที่ต้องการให้แสดงผลจะต้องอยู่ภายใต้เครื่องหมายคำพูด เช่น "ข้อความ" หรือ \'ข้อความ\'',
        description: 'คำสั่งแรกของโปรแกรมเมอร์', instruction: 'พิมพ์ "Hello World"', template: `# พิมพ์ข้อความ\n`, solution: `print("Hello World")`, testCases: [{ expected: 'Hello World' }], requiredKeywords: ['print', 'Hello'], hint: 'ใช้ print("Hello World")'
    },
    {
        id: 'b-02', category: CHAPTERS[0], title: 'Lab 2: แสดงผลหลายบรรทัด',
        lessonContent: 'เมื่อเราเรียกใช้คำสั่ง `print()` หลายๆ ครั้งต่อกัน Python จะทำการแสดงผลแล้ว "ขึ้นบรรทัดใหม่" ให้โดยอัตโนมัติเมื่อจบคำสั่งในแต่ละบรรทัด',
        description: 'ใช้ print() หลายครั้งได้', instruction: 'พิมพ์ "Python" และ "is fun!" คนละบรรทัด', template: `# พิมพ์ 2 บรรทัด\n`, solution: `print("Python")\nprint("is fun!")`, testCases: [{ expected: 'Python\nis fun!' }], requiredKeywords: ['print', 'Python', 'fun'], hint: 'ใช้ print() สองรอบ'
    },
    {
        id: 'b-03', category: CHAPTERS[0], title: 'Lab 3: การคอมเมนต์โค้ด',
        lessonContent: 'การคอมเมนต์ (Comments) คือการใส่เครื่องหมาย `#` ไว้หน้าข้อความ เพื่อบอกให้คอมพิวเตอร์ข้ามและไม่นำบรรทัดนั้นไปประมวลผล นิยมใช้สำหรับเขียนอธิบายโค้ด หรือปิดการทำงานของโค้ดที่ทำให้เกิด Error',
        description: 'คอมเมนต์จะไม่ถูกรัน', instruction: 'เปลี่ยนคำว่า Error ให้เป็นคอมเมนต์', template: `print("Start")\nError\nprint("End")`, solution: `print("Start")\n# Error\nprint("End")`, testCases: [{ expected: 'Start\nEnd' }], requiredKeywords: ['#', 'print'], hint: 'เติม # หน้าคำว่า Error'
    },
    {
        id: 'b-04', category: CHAPTERS[0], title: 'Lab 4: การจัดบล็อก',
        lessonContent: 'Python ไม่มีวงเล็บปีกกา `{ }` เพื่อบอกขอบเขตการทำงาน แต่จะใช้ "การเคาะเว้นวรรค" (Indentation) แทน โดยมาตรฐานจะใช้การกด สเปซบาร์ 4 ครั้ง หรือ กด Tab 1 ครั้ง เพื่อบอกว่าคำสั่งนี้อยู่ภายใต้บล็อกของเงื่อนไขด้านบน',
        description: 'Python ใช้การเคาะวรรค', instruction: 'เคาะ Tab หน้า print ให้ถูกต้อง', template: `if 5 > 2:\nprint("Yes")`, solution: `if 5 > 2:\n    print("Yes")`, testCases: [{ expected: 'Yes' }], requiredKeywords: ['    print'], hint: 'เคาะ Tab หน้าคำสั่ง print'
    },
    {
        id: 'b-05', category: CHAPTERS[0], title: 'Lab 5: ขึ้นบรรทัดใหม่ด้วย \\n',
        lessonContent: 'อักขระพิเศษ (Escape Character) `\\n` (New line) สามารถแทรกไว้ตรงกลางข้อความเพื่อบังคับให้ข้อความที่เหลือถูกปัดไปแสดงผลในบรรทัดใหม่ได้ทันที',
        description: 'ใช้ \\n แทรกในข้อความ', instruction: 'พิมพ์ A และ B คนละบรรทัดด้วย print เดียว', template: `print("A B")`, solution: `print("A\\nB")`, testCases: [{ expected: 'A\nB' }], requiredKeywords: ['\\n', 'print'], hint: 'ใช้ "A\\nB"'
    },
    {
        id: 'b-06', category: CHAPTERS[0], title: 'Lab 6: เคาะแท็บด้วย \\t',
        lessonContent: 'อักขระพิเศษ `\\t` (Tab) ใช้สำหรับเว้นช่องว่างยาวๆ (ประมาณ 4 ตัวอักษร) เพื่อจัดระเบียบตารางหรือระยะห่างของข้อความในบรรทัดเดียวกัน',
        description: 'ใช้ \\t เพื่อเว้นช่องว่าง', instruction: 'พิมพ์ Name และ Age ห่างกัน 1 Tab', template: `print("Name Age")`, solution: `print("Name\\tAge")`, testCases: [{ expected: 'Name\tAge' }], requiredKeywords: ['\\t', 'print'], hint: 'เปลี่ยนสเปซบาร์เป็น \\t'
    },
    {
        id: 'b-07', category: CHAPTERS[0], title: 'Lab 7: การบวกเลขพื้นฐาน',
        lessonContent: 'คำสั่ง `print()` สามารถประมวลผลทางคณิตศาสตร์ได้โดยตรง หากเราไม่ใส่เครื่องหมายคำพูด (Quote) ครอบตัวเลข เช่น `print(5 + 5)` จะได้ผลลัพธ์เป็น 10',
        description: 'print สามารถคำนวณเลขได้', instruction: 'หาผลบวกของ 15 + 30 ด้วย print', template: `# พิมพ์ผลบวก\n`, solution: `print(15 + 30)`, testCases: [{ expected: '45' }], requiredKeywords: ['print', '+'], hint: 'print(15 + 30)'
    },
    {
        id: 'b-08', category: CHAPTERS[0], title: 'Lab 8: ปริ้นตัวอักษรซ้ำ',
        lessonContent: 'ในภาษา Python หากเรานำข้อความ (String) มาคูณ `*` กับตัวเลข (Integer) ระบบจะทำการคัดลอกข้อความนั้นซ้ำๆ ตามจำนวนรอบตัวเลขที่นำมาคูณ',
        description: 'ใช้ * กับข้อความ', instruction: 'พิมพ์ตัว A ติดกัน 5 ตัว', template: `# พิมพ์ A ซ้ำ\n`, solution: `print("A" * 5)`, testCases: [{ expected: 'AAAAA' }], requiredKeywords: ['print', '"A"', '*'], hint: 'print("A" * 5)'
    },
    {
        id: 'b-09', category: CHAPTERS[0], title: 'Lab 9: ปริ้นข้อความปนตัวเลข',
        lessonContent: 'หากต้องการพิมพ์ข้อความและตัวเลขต่อกันในบรรทัดเดียว สามารถใช้เครื่องหมายลูกน้ำ `,` คั่นกลางระหว่างข้อมูลได้เลย (ระบบจะแทรกเว้นวรรคให้ 1 เคาะอัตโนมัติ)',
        description: 'ใช้ลูกน้ำ (,) คั่น', instruction: 'พิมพ์คำว่า "Age:" ตามด้วย 15', template: `# ปริ้นข้อความและตัวเลข\n`, solution: `print("Age:", 15)`, testCases: [{ expected: 'Age: 15' }], requiredKeywords: ['print', ',', '15'], hint: 'print("Age:", 15)'
    },
    {
        id: 'b-10', category: CHAPTERS[0], title: 'Lab 10: ใช้ sep ใน print',
        lessonContent: 'ตามปกติการใช้ `,` คั่นข้อความจะทำให้เกิดช่องว่าง (Space) แต่เราสามารถบังคับให้เปลี่ยนตัวคั่นเป็นสัญลักษณ์อื่นได้โดยระบุ `sep="สัญลักษณ์"` ไว้ท้ายคำสั่ง print',
        description: 'เปลี่ยนตัวคั่นด้วย sep', instruction: 'พิมพ์ 1 2 3 คั่นด้วยขีดกลาง (-)', template: `print(1, 2, 3)`, solution: `print(1, 2, 3, sep="-")`, testCases: [{ expected: '1-2-3' }], requiredKeywords: ['sep', '-'], hint: 'เพิ่ม , sep="-" ในวงเล็บ'
    },

    // --- บทที่ 2: Variables (10 ด่าน) ---
    {
        id: 'v-01', category: CHAPTERS[1], title: 'Lab 11: สร้างตัวแปรแรก',
        lessonContent: 'ตัวแปร (Variables) เปรียบเสมือนกล่องเก็บข้อมูล เราสร้างตัวแปรได้โดยการตั้งชื่อและใช้เครื่องหมาย `=` เพื่อนำข้อมูลไปเก็บไว้ เช่น `age = 15`',
        description: 'เก็บค่าลงตัวแปร', instruction: 'สร้าง x = 10 แล้วพิมพ์ x', template: `x = 10\n`, solution: `x = 10\nprint(x)`, testCases: [{ expected: '10' }], requiredKeywords: ['x', 'print'], hint: 'print(x)'
    },
    {
        id: 'v-02', category: CHAPTERS[1], title: 'Lab 12: พื้นที่สี่เหลี่ยม',
        lessonContent: 'ตัวแปรที่เก็บข้อมูลประเภทตัวเลข (Integer/Float) สามารถนำมากระทำทางคณิตศาสตร์ (+, -, *, /) กันได้ และนำผลลัพธ์ไปเก็บในตัวแปรใหม่ได้เช่นกัน',
        description: 'นำตัวแปรมาคำนวณ', instruction: 'หาพื้นที่ กว้าง 5 ยาว 10', template: `w = 5\nh = 10\n# สร้าง area\n`, solution: `w = 5\nh = 10\narea = w * h\nprint(area)`, testCases: [{ expected: '50' }], requiredKeywords: ['area', '*', 'print'], hint: 'area = w * h'
    },
    {
        id: 'v-03', category: CHAPTERS[1], title: 'Lab 13: เครื่องคิดเลข BMI',
        lessonContent: 'สำหรับการยกกำลัง in Python เราจะไม่ใช้สัญลักษณ์ ^ แต่จะใช้เครื่องหมายดอกจัน 2 ตัวติดกัน `**` เช่น `5 ** 2` คือ 5 ยกกำลัง 2',
        description: 'คำนวณ BMI', instruction: 'น้ำหนัก 60, สูง 1.5 หา BMI', template: `w = 60\nh = 1.5\n`, solution: `w=60\nh=1.5\nprint(w/(h**2))`, testCases: [{ expected: '26.666666666666668' }], requiredKeywords: ['/'], hint: 'w / (h**2)'
    },
    {
        id: 'v-04', category: CHAPTERS[1], title: 'Lab 14: เชื่อมข้อความ',
        lessonContent: 'ตัวแปรประเภทข้อความ (String) สามารถนำมาเชื่อมต่อกันให้เป็นคำยาวๆ ได้ด้วยการใช้เครื่องหมาย `+` เรียกว่า String Concatenation',
        description: 'ใช้ + เชื่อม String', instruction: 'เชื่อม "Py" กับ "thon"', template: `a = "Py"\nb = "thon"\n`, solution: `a="Py"\nb="thon"\nprint(a+b)`, testCases: [{ expected: 'Python' }], requiredKeywords: ['+', 'print'], hint: 'print(a+b)'
    },
    {
        id: 'v-05', category: CHAPTERS[1], title: 'Lab 15: แปลงชนิดข้อมูล (int)',
        lessonContent: 'ตัวเลขที่อยู่ในเครื่องหมายคำพูด `"10"` จะถูกมองว่าเป็นข้อความ ไม่สามารถนำไปบวกเลขได้ ต้องแปลงร่างเป็นจำนวนเต็มก่อนด้วยฟังก์ชัน `int()`',
        description: 'String -> Integer', instruction: 'แปลง "10" เป็น int แล้วบวก 5', template: `num = "10"\n`, solution: `num = "10"\nprint(int(num) + 5)`, testCases: [{ expected: '15' }], requiredKeywords: ['int', '+'], hint: 'int(num) + 5'
    },
    {
        id: 'v-06', category: CHAPTERS[1], title: 'Lab 16: แปลงเป็นข้อความ (str)',
        lessonContent: 'ในทางกลับกัน เราไม่สามารถเอาตัวเลขไปบวกเชื่อมกับข้อความตรงๆ ได้ ต้องใช้ฟังก์ชัน `str()` เพื่อแปลงตัวเลขให้กลายเป็นข้อความก่อน',
        description: 'Integer -> String', instruction: 'แปลง 10 เป็น str และบวกด้วย "A"', template: `n = 10\n`, solution: `n = 10\nprint(str(n) + "A")`, testCases: [{ expected: '10A' }], requiredKeywords: ['str', '+'], hint: 'str(n) + "A"'
    },
    {
        id: 'v-07', category: CHAPTERS[1], title: 'Lab 17: สลับค่าตัวแปร',
        lessonContent: 'Python มีลูกเล่นสุดเจ๋งที่ช่วยให้เราสามารถสลับข้อมูลในตัวแปร 2 ตัวได้พร้อมกันโดยไม่ต้องสร้างตัวแปรชั่วคราว คือการใช้คำสั่งรูปแบบ `a, b = b, a`',
        description: 'สลับค่าอย่างง่าย', instruction: 'สลับค่า a=1 กับ b=2 ให้ a เป็น 2', template: `a = 1\nb = 2\n# สลับค่า\n\nprint(a)`, solution: `a=1\nb=2\na, b = b, a\nprint(a)`, testCases: [{ expected: '2' }], requiredKeywords: ['a, b = b, a'], hint: 'a, b = b, a'
    },
    {
        id: 'v-08', category: CHAPTERS[1], title: 'Lab 18: สร้างตัวแปรพร้อมกัน',
        lessonContent: 'การประกาศตัวแปรทีละบรรทัดอาจทำให้โค้ดยาวเกินไป เราสามารถใช้ Multiple Assignment หรือการสร้างตัวแปรหลายๆ ตัวในบรรทัดเดียวได้ โดยใช้ลูกน้ำคั่นทั้งสองฝั่ง',
        description: 'Multiple assignment', instruction: 'สร้าง x, y, z ให้เป็น 1, 2, 3 ในบรรทัดเดียว พิมพ์ x', template: `# สร้างตัวแปร\n\nprint(x)`, solution: `x, y, z = 1, 2, 3\nprint(x)`, testCases: [{ expected: '1' }], requiredKeywords: ['x, y, z ='], hint: 'x, y, z = 1, 2, 3'
    },
    {
        id: 'v-09', category: CHAPTERS[1], title: 'Lab 19: พื้นที่วงกลม',
        lessonContent: 'ทบทวนการนำตัวแปรค่าทศนิยม (Float) มาใช้งานร่วมกับสูตรคณิตศาสตร์ที่ซับซ้อนขึ้น',
        description: 'สูตร pi * r * r', instruction: 'r=7, pi=3.14 หาพื้นที่', template: `r = 7\npi = 3.14\n`, solution: `r=7\npi=3.14\nprint(pi * r**2)`, testCases: [{ expected: '153.86' }], requiredKeywords: ['*', 'print'], hint: 'pi * (r**2)'
    },
    {
        id: 'v-10', category: CHAPTERS[1], title: 'Lab 20: Modulo หาเศษ',
        lessonContent: 'เครื่องหมาย `%` เรียกว่า โมดูโล (Modulo) มีหน้าที่สำคัญมากคือใช้สำหรับ "หาเศษจากการหาร" ตัวอย่างเช่น 10 หารด้วย 3 ได้ 3 เศษ 1 ค่าที่ได้จาก `10 % 3` จึงมีค่าเท่ากับ 1',
        description: 'หาเศษการหารด้วย %', instruction: 'หาเศษของ 10 หารด้วย 3', template: `# คำนวณเศษ\n`, solution: `print(10 % 3)`, testCases: [{ expected: '1' }], requiredKeywords: ['%', 'print'], hint: '10 % 3'
    },

    // --- บทที่ 3: If-Else (10 ด่าน) ---
    {
        id: 'i-01', category: CHAPTERS[2], title: 'Lab 21: เงื่อนไขพื้นฐาน (If)',
        lessonContent: 'คำสั่ง `if` ใช้ในการตรวจสอบเงื่อนไข หากความจริงของเงื่อนไข (Condition) เป็น True โค้ดที่อยู่ภายใต้บล็อกของ if (ที่ถูกย่อหน้าเข้าไป) ถึงจะถูกทำงาน',
        description: 'ตรวจสอบความจริง', instruction: 'ถ้า x=10, เช็คว่า x>5 ให้พิมพ์ "Yes"', template: `x = 10\n`, solution: `x=10\nif x>5:\n    print("Yes")`, testCases: [{ expected: 'Yes' }], requiredKeywords: ['if', '>'], hint: 'if x > 5:'
    },
    {
        id: 'i-02', category: CHAPTERS[2], title: 'Lab 22: สองทางเลือก (Else)',
        lessonContent: 'เมื่อมีเงื่อนไข `if` แล้ว เราสามารถเพิ่ม `else` สำหรับ "ทางเลือกสำรอง" ให้โปรแกรมทำงานในกรณีที่เงื่อนไขของ if ไม่เป็นความจริง (False)',
        description: 'ถ้าไม่ใช่ ให้ทำ Else', instruction: 'x=3, เช็ค x>5 พิมพ์ Yes ถ้าไม่ใช่ พิมพ์ No', template: `x = 3\n`, solution: `x=3\nif x>5:\n    print("Yes")\nelse:\n    print("No")`, testCases: [{ expected: 'No' }], requiredKeywords: ['else', 'print'], hint: 'เพิ่ม else:'
    },
    {
        id: 'i-03', category: CHAPTERS[2], title: 'Lab 23: เลขคู่/คี่',
        lessonContent: 'การตรวจสอบเลขคู่ (Even) ในทางโปรแกรมมิ่ง มักนิยมใช้ Modulo `%` มาช่วย โดยเช็คว่าตัวเลขนั้น "หาร 2 แล้วเหลือเศษ 0" หรือไม่ (`num % 2 == 0`)',
        description: 'ใช้ Modulo', instruction: 'n=4 ถ้าหาร 2 ลงตัวพิมพ์ Even นอกนั้น Odd', template: `n = 4\n`, solution: `n=4\nif n%2==0:\n    print("Even")\nelse:\n    print("Odd")`, testCases: [{ expected: 'Even' }], requiredKeywords: ['% 2', '== 0'], hint: 'if n % 2 == 0:'
    },
    {
        id: 'i-04', category: CHAPTERS[2], title: 'Lab 24: หลายทางเลือก (Elif)',
        lessonContent: 'เมื่อมีตัวเลือกมากกว่า 2 ทางเลือก (เช่น เกรด 4, 3, 2, 1) เราจะใช้คำสั่ง `elif` ซึ่งย่อมาจาก else if เพื่อระบุเงื่อนไขเพิ่มเติมที่อยู่ตรงกลางระหว่าง if กับ else',
        description: 'บวก/ลบ/ศูนย์', instruction: 'n=0 เช็ค >0 พิมพ์ Pos, <0 พิมพ์ Neg, นอกนั้น Zero', template: `n = 0\n`, solution: `n=0\nif n>0:\n    print("Pos")\nelif n<0:\n    print("Neg")\nelse:\n    print("Zero")`, testCases: [{ expected: 'Zero' }], requiredKeywords: ['elif'], hint: 'ใช้ elif สำหรับเงื่อนไขที่สอง'
    },
    {
        id: 'i-05', category: CHAPTERS[2], title: 'Lab 25: เกรด ABC',
        lessonContent: 'ข้อควรระวังในการใช้ if-elif-else ลำดับความสำคัญจะถูกประเมินจากบนลงล่าง หากเงื่อนไขแรกเป็นจริงแล้ว โปรแกรมจะข้ามเงื่อนไขที่เหลือทั้งหมดทันที',
        description: 'เช็คช่วงคะแนน', instruction: 's=75, >=80=A, >=70=B, นอกนั้น C', template: `s = 75\n`, solution: `s=75\nif s>=80:\n    print("A")\nelif s>=70:\n    print("B")\nelse:\n    print("C")`, testCases: [{ expected: 'B' }], requiredKeywords: ['elif', '>= 70'], hint: 'elif s >= 70:'
    },
    {
        id: 'i-06', category: CHAPTERS[2], title: 'Lab 26: เงื่อนไขคู่ (AND)',
        lessonContent: 'โอเปอเรเตอร์ตรรกศาสตร์ `and` ใช้สำหรับเชื่อมเงื่อนไขหลายๆ อันเข้าด้วยกัน โดยที่ "ทุกเงื่อนไข" จะต้องเป็นความจริงทั้งหมด (True) บล็อกคำสั่งจึงจะทำงาน',
        description: 'เช็ค 2 เงื่อนไข', instruction: 'x=15, เช็ค x>10 AND x<20 ให้พิมพ์ True', template: `x = 15\n`, solution: `x=15\nif x>10 and x<20:\n    print("True")`, testCases: [{ expected: 'True' }], requiredKeywords: ['and'], hint: 'if x>10 and x<20:'
    },
    {
        id: 'i-07', category: CHAPTERS[2], title: 'Lab 27: เงื่อนไขทางเลือก (OR)',
        lessonContent: 'แตกต่างจาก AND โอเปอเรเตอร์ `or` จะต้องการเพียงแค่ "เงื่อนไขใดเงื่อนไขหนึ่ง" เป็นความจริงเท่านั้น บล็อกคำสั่งก็จะทำงานทันที',
        description: 'เป็นจริงแค่อย่างเดียว', instruction: 'x=5, เช็ค x==5 OR x==10 พิมพ์ Ok', template: `x = 5\n`, solution: `x=5\nif x==5 or x==10:\n    print("Ok")`, testCases: [{ expected: 'Ok' }], requiredKeywords: ['or'], hint: 'if x==5 or x==10:'
    },
    {
        id: 'i-08', category: CHAPTERS[2], title: 'Lab 28: ค่าที่มากที่สุด',
        lessonContent: 'ทบทวนการใช้เครื่องหมาย `and` นำมาประยุกต์ใช้เพื่อเปรียบเทียบว่าค่าตัวแปรหนึ่ง สามารถเอาชนะตัวแปรอื่นๆ ได้ทั้งหมดหรือไม่',
        description: 'เทียบตัวแปร 3 ตัว', instruction: 'a=5, b=9, c=2 หาค่ามากสุดแล้วพิมพ์ออกมา', template: `a, b, c = 5, 9, 2\n`, solution: `a,b,c=5,9,2\nif a>=b and a>=c:\n    print(a)\nelif b>=a and b>=c:\n    print(b)\nelse:\n    print(c)`, testCases: [{ expected: '9' }], requiredKeywords: ['and', 'elif'], hint: 'ใช้ and เพื่อเช็คชนะทั้งสองตัว'
    },
    {
        id: 'i-09', category: CHAPTERS[2], title: 'Lab 29: Nested If (If ซ้อน If)',
        lessonContent: 'เราสามารถนำคำสั่ง `if` ไปซ้อนไว้ด้านในของคำสั่ง `if` ที่อยู่ด้านบนได้ เรียกว่า Nested If ใช้ในกรณีที่เงื่อนไขมีความซับซ้อนหลายขั้นตอน',
        description: 'เงื่อนไขซ้อนกัน', instruction: 'x=10, เช็ค x>5 ถ้าจริงให้เช็คซ้อนว่า x==10 พิมพ์ Bingo', template: `x = 10\n`, solution: `x=10\nif x>5:\n    if x==10:\n        print("Bingo")`, testCases: [{ expected: 'Bingo' }], requiredKeywords: ['if x==10'], hint: 'ย่อหน้า if ซ้อนเข้าไปอีกชั้น'
    },
    {
        id: 'i-10', category: CHAPTERS[2], title: 'Lab 30: ตรวจสอบสมาชิกกลุ่ม (In)',
        lessonContent: 'คีย์เวิร์ด `in` เป็นความสามารถพิเศษ of Python ที่ช่วยให้การเช็คว่าอักขระตัวนึง มีอยู่ในกลุ่มคำหรือข้อความหลักที่กำหนดไว้หรือไม่ ทำได้ง่ายมากเพียงบรรทัดเดียว',
        description: 'เช็คคำในกลุ่ม (In)', instruction: 'c="a", ถ้า c อยู่ใน "aeiou" พิมพ์ Yes', template: `c = "a"\n`, solution: `c="a"\nif c in "aeiou":\n    print("Yes")`, testCases: [{ expected: 'Yes' }], requiredKeywords: ['in "aeiou"'], hint: 'if c in "aeiou":'
    },

    // --- บทที่ 4: Loops (10 ด่าน) ---
    {
        id: 'l-01', category: CHAPTERS[3], title: 'Lab 31: ลูป For พื้นฐาน',
        lessonContent: 'การวนซ้ำ (Loops) ช่วยให้คอมพิวเตอร์ทำงานซ้ำๆ แทนเรา คำสั่ง `for` ใน Python มักจะใช้คู่กับ `range(เริ่ม, จบ)` โดยจะทำงานจนถึงก่อนตัวเลขสิ้นสุด 1 ค่า (เช่น range(1,4) ทำถึง 3)',
        description: 'นับเลข', instruction: 'ใช้ for พิมพ์ 1 ถึง 3', template: `# พิมพ์ 1, 2, 3\n`, solution: `for i in range(1,4):\n    print(i)`, testCases: [{ expected: '1\n2\n3' }], requiredKeywords: ['for', 'range'], hint: 'range(1, 4)'
    },
    {
        id: 'l-02', category: CHAPTERS[3], title: 'Lab 32: ลูปแบบก้าว (Step)',
        lessonContent: 'ในฟังก์ชัน `range(start, stop, step)` ตัวที่ 3 เราสามารถระบุขนาดการก้าวเดินของการนับเลขได้ เช่น ก้าวทีละ 2 เพื่อใช้นับเลขคู่หรือเลขคี่แบบกระโดดข้าม',
        description: 'นับทีละ 2', instruction: 'พิมพ์ 2, 4, 6 โดยกำหนด step ใน range', template: `# พิมพ์เลขคู่\n`, solution: `for i in range(2,7,2):\n    print(i)`, testCases: [{ expected: '2\n4\n6' }], requiredKeywords: ['range(2,', '2)'], hint: 'range(2, 7, 2)'
    },
    {
        id: 'l-03', category: CHAPTERS[3], title: 'Lab 33: ผลรวม 1 ถึง 5',
        lessonContent: 'เทคนิค Accumulator คือการสร้างตัวแปรเก็บค่าเริ่มต้นไว้ที่ 0 ภายนอกลูป แล้วนำตัวแปรที่กำลังวิ่งอยู่ในลูปมาบวกสะสมลงไปในตัวแปรนั้นในแต่ละรอบ',
        description: 'สะสมค่า', instruction: 'หาผลรวม 1+2+3+4+5 พิมพ์ผลลัพธ์', template: `t = 0\n`, solution: `t=0\nfor i in range(1,6):\n    t+=i\nprint(t)`, testCases: [{ expected: '15' }], requiredKeywords: ['+=', 'print'], hint: 't += i'
    },
    {
        id: 'l-04', category: CHAPTERS[3], title: 'Lab 34: ตารางสูตรคูณแม่ 2',
        lessonContent: 'การทำงานของ f-string (`f"ข้อความ {ตัวแปร}"`) นั้นเหมาะมากสำหรับนำมาประยุกต์จัดระเบียบตารางในลูป เพราะมันช่วยให้ข้อความและค่าในตัวแปรแสดงผลอยู่ด้วยกันได้',
        description: 'สูตรคูณถึง 3', instruction: 'พิมพ์ 2x1=2 ถึง 2x3=6', template: `n=2\nfor i in range(1,4):\n    `, solution: `n=2\nfor i in range(1,4):\n    print(f"{n}x{i}={n*i}")`, testCases: [{ expected: '2x1=2\n2x2=4\n2x3=6' }], requiredKeywords: ['f"'], hint: 'print(f"{n}x{i}={n*i}")'
    },
    {
        id: 'l-05', category: CHAPTERS[3], title: 'Lab 35: ลูป While',
        lessonContent: 'แตกต่างจาก `for` ที่ระบุรอบชัดเจน ลูป `while` จะคอยวนซ้ำแบบไม่รู้จบตราบใดที่เงื่อนไขด้านหลังยังคงเป็นความจริง (True) สิ่งสำคัญคือในลูปต้องมีคำสั่งเพื่อลด/เพิ่มค่าไม่ให้เกิด Infinity Loop',
        description: 'วนจนกว่าเงื่อนไขเท็จ', instruction: 'count=3 นับถอยหลัง 3 2 1', template: `count=3\n`, solution: `c=3\nwhile c>0:\n    print(c)\n    c-=1`, testCases: [{ expected: '3\n2\n1' }], requiredKeywords: ['while', '-='], hint: 'while c>0: แล้ว c-=1'
    },
    {
        id: 'l-06', category: CHAPTERS[3], title: 'Lab 36: หาค่า Factorial',
        lessonContent: 'สำหรับปัญหาการคูณสะสมอย่าง Factorial เราต้องเริ่มตั้งค่าตัวเก็บสะสม (Accumulator) ให้เป็น 1 (เพราะถ้าให้ค่าเริ่มต้นเป็น 0 เอาไปคูณกับอะไรก็จะได้ 0 เสมอ)',
        description: 'ผลคูณสะสม', instruction: 'n=4 หา 4*3*2*1 พิมพ์ผล', template: `n=4\nf=1\n`, solution: `n=4\nf=1\nfor i in range(1,n+1):\n    f*=i\nprint(f)`, testCases: [{ expected: '24' }], requiredKeywords: ['*='], hint: 'f *= i'
    },
    {
        id: 'l-07', category: CHAPTERS[3], title: 'Lab 37: หยุดลูป (Break)',
        lessonContent: 'คำสั่ง `break` ใช้สำหรับทำลายขอบเขตการทำงานของลูปนั้นๆ ทิ้งทันที (ถึงแม้รอบจะยังเหลืออยู่ก็ตาม) นิยมนำไปใช้ในกรณีที่ค้นพบเป้าหมายที่ต้องการแล้ว',
        description: 'เบรกเมื่อเจอเลขที่ต้องการ', instruction: 'วน 1 ถึง 5 ถ้าเจอ 3 ให้พิมพ์แล้ว Break ทันที', template: `for i in range(1,6):\n    `, solution: `for i in range(1,6):\n    print(i)\n    if i==3:\n        break`, testCases: [{ expected: '1\n2\n3' }], requiredKeywords: ['break'], hint: 'if i==3: break'
    },
    {
        id: 'l-08', category: CHAPTERS[3], title: 'Lab 38: ข้ามลูป (Continue)',
        lessonContent: 'คำสั่ง `continue` ไม่ได้ทำลายลูปทิ้งเหมือน `break` แต่มันจะสั่งให้โปรแกรม "ข้าม" การทำงานคำสั่งที่เหลือในรอบปัจจุบัน แล้วกระโดดไปเริ่มลูปรอบถัดไปทันที',
        description: 'ข้ามรอบปัจจุบัน', instruction: 'วน 1 ถึง 3 ถ้าเจอ 2 ให้ข้าม พิมพ์แค่ 1 กับ 3', template: `for i in range(1,4):\n    `, solution: `for i in range(1,4):\n    if i==2:\n        continue\n    print(i)`, testCases: [{ expected: '1\n3' }], requiredKeywords: ['continue'], hint: 'if i==2: continue'
    },
    {
        id: 'l-09', category: CHAPTERS[3], title: 'Lab 39: Loop ซ้อน Loop',
        lessonContent: 'Nested Loop คือการเอาคำสั่ง For ไปซ้อนไว้ใน For มักใช้เพื่อวาดรูปทรงต่างๆ หรือจัดการข้อมูลแบบ 2 มิติ (ตาราง) โดยที่ลูปด้านในจะต้องรันจนครบก่อน ลูปด้านนอกถึงจะขยับรอบต่อไป',
        description: 'Nested Loop', instruction: 'พิมพ์ดาว 3 บรรทัด บรรทัดละ 2 ดวง (รวม 6 ดวงแยกบรรทัด)', template: `for i in range(3):\n    for j in range(2):\n        `, solution: `for i in range(3):\n    for j in range(2):\n        print("*")`, testCases: [{ expected: '*\n*\n*\n*\n*\n*' }], requiredKeywords: ['for j'], hint: 'สั่ง print("*")'
    },
    {
        id: 'l-10', category: CHAPTERS[3], title: 'Lab 40: นับตัวอักษร',
        lessonContent: 'ตัวแปรชนิดข้อความ (String) ใน Python มีสถานะเป็นกลุ่มก้อนข้อมูล เราจึงสามารถเอาโครงสร้าง `for ... in ...:` ไปไล่หยิบตัวอักษรออกมาอ่านทีละตัวได้โดยตรงเลย',
        description: 'วนลูป String', instruction: 'วนลูปคำว่า "Py" แล้วพิมพ์ทีละตัว', template: `for c in "Py":\n    `, solution: `for c in "Py":\n    print(c)`, testCases: [{ expected: 'P\ny' }], requiredKeywords: ['for c in'], hint: 'print(c)'
    },

    // --- --- บทที่ 5: Functions (10 ด่าน) --- ---
    {
        id: 'f-01', category: CHAPTERS[4], title: 'Lab 41: สร้าง Function',
        lessonContent: 'การสร้างฟังก์ชันคือการห่อหุ้มชุดคำสั่งหลายๆ บรรทัดให้รวมเป็น "คำสั่งใหม่ชื่อเดียว" เพื่อให้สะดวกในการเรียกใช้ซ้ำหลายๆ รอบ โดยเราจะประกาศฟังก์ชันด้วยคีย์เวิร์ด `def`',
        description: 'เริ่มใช้ def', instruction: 'สร้างฟังก์ชัน hello() พิมพ์ "Hi" แล้วเรียกใช้งาน', template: `# สร้าง def\n`, solution: `def hello():\n    print("Hi")\nhello()`, testCases: [{ expected: 'Hi' }], requiredKeywords: ['def', 'hello()'], hint: 'def hello():'
    },
    {
        id: 'f-02', category: CHAPTERS[4], title: 'Lab 42: รับพารามิเตอร์',
        lessonContent: 'พารามิเตอร์ (Parameter) คือตัวแปรชั่วคราวที่อยู่ภายในวงเล็บของฟังก์ชัน ทำหน้าที่รอรับข้อมูลจากข้างนอกส่งเข้ามาให้ฟังก์ชันประมวลผล',
        description: 'ส่งค่าเข้าฟังก์ชัน', instruction: 'สร้าง greet(name) พิมพ์ "Hi "+name เรียก greet("Job")', template: `#\n`, solution: `def greet(n):\n    print("Hi "+n)\ngreet("Job")`, testCases: [{ expected: 'Hi Job' }], requiredKeywords: ['def', 'greet('], hint: 'print("Hi " + n)'
    },
    {
        id: 'f-03', category: CHAPTERS[4], title: 'Lab 43: คืนค่า (Return)',
        lessonContent: 'หากต้องการให้ฟังก์ชันคำนวณแล้วส่งผลลัพธ์ไปให้ตัวแปรอื่นทำงานต่อ เราจะห้ามใช้ print แต่จะต้องใช้คีย์เวิร์ด `return` ในการส่งค่ากลับออกไปเท่านั้น',
        description: 'ส่งค่ากลับ', instruction: 'สร้าง add(a,b) return a+b พิมพ์ add(2,3)', template: `#\n`, solution: `def add(a,b):\n    return a+b\nprint(add(2,3))`, testCases: [{ expected: '5' }], requiredKeywords: ['return', 'print(add'], hint: 'return a+b'
    },
    {
        id: 'f-04', category: CHAPTERS[4], title: 'Lab 44: หาค่าสัมบูรณ์',
        lessonContent: 'เมื่อระบบประมวลผลไปเจอกับคำสั่ง `return` ฟังก์ชันนั้นจะหยุดการทำงานและส่งค่ากลับทันที (คำสั่งที่อยู่ด้านล่าง return จะไม่ถูกทำต่อ)',
        description: 'Absolute Value', instruction: 'สร้าง abs_val(n) ถ้า n<0 คืนค่า -n นอกนั้น n พิมพ์ abs_val(-5)', template: `#\n`, solution: `def abs_val(n):\n    if n<0: return -n\n    return n\nprint(abs_val(-5))`, testCases: [{ expected: '5' }], requiredKeywords: ['return -n'], hint: 'return -n'
    },
    {
        id: 'f-05', category: CHAPTERS[4], title: 'Lab 45: หาจำนวนเฉพาะ',
        lessonContent: 'จำนวนเฉพาะ (Prime) คือตัวเลขที่หาร 1 และตัวมันเองลงตัวเท่านั้น อัลกอริทึมในการหาคือการนำตัวเลขตั้งแต่ 2 จนถึง n-1 มาหารดู ถ้ามีตัวไหนหารลงตัวแปลว่าไม่ใช่',
        description: 'is_prime', instruction: 'สร้าง is_prime(5) คืนค่า True พิมพ์มันออกมา', template: `#\n`, solution: `def is_prime(n):\n    for i in range(2,n):\n        if n%i==0: return False\n    return True\nprint(is_prime(5))`, testCases: [{ expected: 'True' }], requiredKeywords: ['%'], hint: 'return False ถ้าหารลงตัว'
    },
    {
        id: 'f-06', category: CHAPTERS[4], title: 'Lab 46: ตัวหารร่วมมาก (หรม.)',
        lessonContent: 'ขั้นตอนวิธีของยุคลิด (Euclidean algorithm) เป็นอัลกอริทึมที่เร็วที่สุดในการหา หรม. โดยการหารเอาเศษสลับกันไปมาจนกว่าเศษจะเป็นศูนย์',
        description: 'GCD', instruction: 'สร้าง gcd(10,5) โดยลูป while b!=0: a,b=b,a%b แล้วพิมพ์ผล', template: `#\n`, solution: `def gcd(a,b):\n    while b!=0:\n        a,b=b,a%b\n    return a\nprint(gcd(10,5))`, testCases: [{ expected: '5' }], requiredKeywords: ['while', 'a%b'], hint: 'a, b = b, a%b'
    },
    {
        id: 'f-07', category: CHAPTERS[4], title: 'Lab 47: ลำดับฟีโบนัชชี',
        lessonContent: 'การเรียกใช้ฟังก์ชันตัวเอง (Recursion) เป็นเทคนิคขั้นสูงที่ฟังก์ชันจะส่งค่าย้อนกลับเข้าไปประมวลผลในโครงสร้างของตัวเองซ้ำๆ เพื่อลดความยาวของโค้ดให้เหลือบรรทัดเดียว',
        description: 'Fibonacci n=5', instruction: 'สร้าง fibo(n) ถ้า n<=1 return n นอกนั้น fibo(n-1)+fibo(n-2) พิมพ์ fibo(5)', template: `#\n`, solution: `def fibo(n):\n    if n<=1: return n\n    return fibo(n-1)+fibo(n-2)\nprint(fibo(5))`, testCases: [{ expected: '5' }], requiredKeywords: ['fibo(n-1)'], hint: 'Recursive: return fibo(n-1)+fibo(n-2)'
    },
    {
        id: 'f-08', category: CHAPTERS[4], title: 'Lab 48: รีเวิร์สข้อความ',
        lessonContent: 'ใน Python การสไลซ์ข้อความแบบกำหนดก้าวเดินถอยหลัง `[::-1]` ถือเป็นทางลัดที่โปรแกรมเมอร์ใช้ในการกลับด้านข้อความ (Reverse String) อย่างรวดเร็ว',
        description: 'String reverse', instruction: 'สร้าง rev(s) ให้คืนค่า s[::-1] พิมพ์ rev("Cat")', template: `#\n`, solution: `def rev(s):\n    return s[::-1]\nprint(rev("Cat"))`, testCases: [{ expected: 'taC' }], requiredKeywords: ['[::-1]'], hint: 'return s[::-1]'
    },
    {
        id: 'f-09', category: CHAPTERS[4], title: 'Lab 49: นับสระในคำ',
        lessonContent: 'ทบทวนการนำความรู้ทั้งหมดมามัดรวมกัน: สร้างตัวแปร Accumulator นอกลูป, วนลูปอ่านอักขระ, ใช้เงื่อนไข in คัดกรองข้อมูล, และ return ค่าสะสมออกไป',
        description: 'Count Vowels', instruction: 'สร้าง count_v("Ice") ให้วนลูปนับ aeiou คืนค่าจำนวน พิมพ์ผล', template: `#\n`, solution: `def count_v(s):\n    c=0\n    for x in s:\n        if x in "aeiouAEIOU": c+=1\n    return c\nprint(count_v("Ice"))`, testCases: [{ expected: '2' }], requiredKeywords: ['in "aeiou'], hint: 'c+=1 ถ้า x in "aeiouAEIOU"'
    },
    {
        id: 'f-10', category: CHAPTERS[4], title: 'Lab 50: พีระมิดดาว',
        lessonContent: 'การคูณข้อความ (String Multiplication) ใน Python เปิดโอกาสให้เราไม่ต้องใช้ Nested Loop ที่ซับซ้อนในการวาดรูปเสมอไป แค่จับสมการความสัมพันธ์มาคูณกับอักขระก็พอ',
        description: 'Star Pyramid', instruction: 'สร้าง star(2) พิมพ์ดาว 2 ชั้น (บรรทัดแรก " *", บรรทัดสอง "***")', template: `#\n`, solution: `def star(n):\n    for i in range(1,n+1):\n        print(" "*(n-i)+"*"*(2*i-1))\nstar(2)`, testCases: [{ expected: ' *\n***' }], requiredKeywords: ['"*"*'], hint: 'print(" "*(n-i) + "*"*(2*i-1))'
    },

    // --- บทที่ 6: ตะลุยโจทย์ TOI-Zero (10 ด่าน จาก PDF 001-010) ---
    {
        id: 't-01', category: CHAPTERS[5], title: 'Lab 51 (A1-001): ชื่อและชื่อแฝง',
        lessonContent: 'เทคนิค String Slicing `name[:2]` มีความหมายคือ การเข้าถึงตัวอักษรและตัดหยิบข้อมูลตั้งแต่ตำแหน่งเริ่มต้น จนถึงก่อนตำแหน่งที่ 2',
        description: 'พิมพ์ Hello และชื่อแฝง (2 ตัวอักษรแรก)', instruction: 'n="Katy", s="Perry" พิมพ์ Hello Katy Perry และ KaPe', template: `n = "Katy"\ns = "Perry"\n`, solution: `n="Katy"\ns="Perry"\nprint(f"Hello {n} {s}")\nprint(n[:2]+s[:2])`, testCases: [{ expected: 'Hello Katy Perry\nKaPe' }], requiredKeywords: ['[:2]'], hint: 'ใช้ n[:2] + s[:2]'
    },
    {
        id: 't-02', category: CHAPTERS[5], title: 'Lab 52 (A1-002): ทอนเงินเหรียญ',
        lessonContent: 'การคำนวณเงินทอนจะใช้ `//` (หารปัดเศษทิ้ง) เพื่อหาจำนวนเหรียญที่สามารถจ่ายได้ และใช้ `%` (หารเอาเศษ) เพื่อคำนวณยอดเงินที่ยังเหลืออยู่',
        description: 'หาจำนวนเหรียญ 10, 5, 2, 1', instruction: 'money=28 พิมพ์จำนวนเหรียญ 10=2, 5=1, 2=1, 1=1', template: `m = 28\n`, solution: `m=28\nprint(f"10={m//10}")\nm%=10\nprint(f"5={m//5}")\nm%=5\nprint(f"2={m//2}")\nm%=2\nprint(f"1={m}")`, testCases: [{ expected: '10=2\n5=1\n2=1\n1=1' }], requiredKeywords: ['//10', '%=10'], hint: 'ใช้ m//10 หาจำนวน และ m%=10 หาเศษที่เหลือ'
    },
    {
        id: 't-03', category: CHAPTERS[5], title: 'Lab 53 (A1-003): ค่าสูงสุด (Max)',
        lessonContent: 'ข้อสอบการหาค่าสูงสุด เป็นการทดสอบความเข้าใจในการใช้ตัวเชื่อมตรรกศาสตร์ `and` เพื่อให้ตัวแปรหนึ่งเอาชนะเงื่อนไขอื่นได้ทั้งหมด',
        description: 'หาค่ามากสุดใน 3 ค่า', instruction: 'a=2, b=4, c=1 พิมพ์ตัวที่มากที่สุด', template: `a,b,c = 2,4,1\n`, solution: `a,b,c=2,4,1\nif a>=b and a>=c: print(a)\nelif b>=a and b>=c: print(b)\nelse: print(c)`, testCases: [{ expected: '4' }], requiredKeywords: ['and'], hint: 'if a>=b and a>=c:'
    },
    {
        id: 't-04', category: CHAPTERS[5], title: 'Lab 54 (A1-004): ผลการสอบ',
        lessonContent: 'ถ้ามีเกณฑ์การประเมินหลายข้อ และบังคับว่า "ต้องผ่านทั้งหมด" เราจะต้องเชื่อมเกณฑ์แต่ละข้อด้วย `and` ในบรรทัดเดียวไปเลย',
        description: 'คะแนน 3 ส่วน ต้อง >=50% ทุกส่วน', instruction: 'เต็มคือ 10, 40, 50. ถ้า e=5, m=20, f=25 (ผ่านทุกอัน) พิมพ์ pass', template: `e,m,f = 5,20,25\n`, solution: `e,m,f=5,20,25\nif e>=5 and m>=20 and f>=25:\n    print("pass")\nelse:\n    print("fail")`, testCases: [{ expected: 'pass' }], requiredKeywords: ['>=5', '>=20', 'pass'], hint: 'if e>=5 and m>=20 and f>=25:'
    },
    {
        id: 't-05', category: CHAPTERS[5], title: 'Lab 55 (A1-005): ฤดูกาล (Seasons)',
        lessonContent: 'เนื่องจาก if-elif-else จะทำงานจากบนลงล่าง เราจึงไม่จำเป็นต้องเช็คเงื่อนไขย้อนกลับไปมา เช่น ถ้าน้อยกว่า 3 แล้ว ถัดไปเช็คแค่น้อยกว่า 6 ก็พอ (ไม่ต้องเช็คซ้ำว่ามากกว่า 3)',
        description: 'แบ่ง 4 ฤดูตามเดือน', instruction: 'm=3 พิมพ์ winter (สมมติแค่วิเคราะห์เดือน 1-3=winter)', template: `m=3\n`, solution: `m=3\nif m<=3:\n    print("winter")\nelif m<=6:\n    print("spring")\nelif m<=9:\n    print("summer")\nelse:\n    print("fall")`, testCases: [{ expected: 'winter' }], requiredKeywords: ['winter'], hint: 'if m<=3:'
    },
    {
        id: 't-06', category: CHAPTERS[5], title: 'Lab 56 (A1-006): หารลงตัวไหม',
        lessonContent: 'นิยามทางคณิตศาสตร์ของการหารลงตัวคือ การนำตัวตั้งมาหารตัวหาร แล้วจะต้องไม่เหลือเศษเลย ซึ่งโปรแกรมจะใช้ตรรกะ `n1 % n2 == 0` เสมอ',
        description: 'ตัวแรกหารตัวสอง', instruction: 'n1=45, n2=6 ถ้าหารลงตัวพิมพ์ yes ไม่ลงพิมพ์ no', template: `n1,n2 = 45,6\n`, solution: `n1,n2=45,6\nif n1%n2==0:\n    print("yes")\nelse:\n    print("no")`, testCases: [{ expected: 'no' }], requiredKeywords: ['%n2'], hint: 'n1 % n2 == 0'
    },
    {
        id: 't-07', category: CHAPTERS[5], title: 'Lab 57 (A1-007): ตรวจสอบสระ',
        lessonContent: 'คำสั่ง `in` เป็นลูกเล่นของ Python ที่หาตัวจับยาก โดยมันสามารถใช้ตรวจสอบหาสิ่งของชิ้นเล็ก ภายในลิสต์ของข้อมูล หรือภายในข้อความสายยาวๆ ได้ในเสี้ยววินาที',
        description: 'เช็ค a,e,i,o,u', instruction: 'c="a" ถ้าเป็นสระพิมพ์ yes ไม่ใช่พิมพ์ no', template: `c = "a"\n`, solution: `c="a"\nif c in "aeiou":\n    print("yes")\nelse:\n    print("no")`, testCases: [{ expected: 'yes' }], requiredKeywords: ['in "aeiou"'], hint: 'c in "aeiou"'
    },
    {
        id: 't-08', category: CHAPTERS[5], title: 'Lab 58 (A1-008): ตรวจบัตร ปชช.',
        lessonContent: 'เราสามารถตรวจสอบนับปริมาณ หรือความยาวของข้อความได้ด้วยการใช้ฟังก์ชัน `len()` ซึ่งย่อมาจาก Length แล้วนำมาเช็คเงื่อนไขความยาวที่ต้องการ',
        description: 'เลข 13 หลัก', instruction: 'id="1022354120102" ถ้าความยาว 13 พิมพ์ yes', template: `id = "1022354120102"\n`, solution: `id="1022354120102"\nif len(id)==13:\n    print("yes")\nelse:\n    print("no")`, testCases: [{ expected: 'yes' }], requiredKeywords: ['len('], hint: 'len(id) == 13'
    },
    {
        id: 't-09', category: CHAPTERS[5], title: 'Lab 59 (A1-009): สอบผ่าน/ไม่ผ่าน',
        lessonContent: 'ทักษะอัลกอริทึมคือการนำองค์ความรู้หลายๆ ส่วนมาต่อประกอบกัน ในข้อนี้เราต้องจับตัวแปรมาคำนวณและสั่งพิมพ์ก่อน แล้วค่อยนำผลลัพธ์ไปเข้ากระบวนการเงื่อนไข',
        description: 'รวม Mid + Final', instruction: 'm=25, f=35 พิมพ์ผลรวม แล้วพิมพ์ pass ถ้า >=50', template: `m=25\nf=35\n`, solution: `m=25\nf=35\nt=m+f\nprint(t)\nif t>=50: print("pass")\nelse: print("fail")`, testCases: [{ expected: '60\npass' }], requiredKeywords: ['+f', 'pass'], hint: 'หาผลรวม t = m + f'
    },
    {
        id: 't-10', category: CHAPTERS[5], title: 'Lab 60 (A1-010): ค่าตั๋วสวนสัตว์',
        lessonContent: 'การพิจารณาตรรกะแบบผสมผสาน ในโจทย์ระบุข้อความ "อายุต่ำกว่า หรือ เป็นนักเรียน" คำว่า "หรือ" มีผลทำให้เราต้องใช้การเชื่อมตรรกศาสตร์ด้วย `or`',
        description: 'โปรโมชั่นนักเรียนและเด็ก', instruction: 'a=15, s="S" ถ้า a<18 หรือ s in "Ss" พิมพ์ 20 นอกนั้น 50', template: `a=15\ns="S"\n`, solution: `a=15\ns="S"\nif a<18 or s in "Ss":\n    print("20")\nelse:\n    print("50")`, testCases: [{ expected: '20' }], requiredKeywords: ['<18', 'or'], hint: 'a < 18 or s in "Ss"'
    }
];

// ข้อมูลจำลองสำหรับโหมด Demo ในเครื่อง 
const MOCK_CLASS_STUDENTS = [
    {
        id: 'std-01', name: 'น้องก้องเกียรติ (15 ปี)', avatar: '🧑‍💻', xp: 2200, consistency: 90,
        completedMap: {
            'b-01': true, 'b-02': true, 'b-03': true, 'b-04': true, 'b-05': true, 'b-06': true, 'b-07': true, 'b-08': true, 'b-09': true, 'b-10': true,
            'v-01': true, 'v-02': true, 'v-03': true, 'v-04': true, 'v-05': true,
        },
        skills: { logic: 95, variables: 100, functions: 40, problemSolving: 85, consistency: 90 },
        latestCode: `print(int("10")+5)`, feedbackFromTeacher: ''
    },
    {
        id: 'std-02', name: 'น้องเมทินี (14 ปี)', avatar: '👩‍💻', xp: 500, consistency: 60,
        completedMap: { 'b-01': true, 'b-02': true, 'b-03': true, 'b-04': true, 'b-05': true },
        skills: { logic: 60, variables: 70, functions: 10, problemSolving: 50, consistency: 60 },
        latestCode: `print("A\\nB")`, feedbackFromTeacher: 'ดีมากค่ะ เริ่มต้นได้ดีมาก ลุยต่อเลย!'
    },
    {
        id: 'std-03', name: 'น้องพัชรพงศ์ (17 ปี)', avatar: '🧑‍🚀', xp: 6000, consistency: 98,
        // เปิดให้พัชรพงศ์ทำสำเร็จหมดแล้วทุก 60 ด่าน
        completedMap: LESSON_LABS.reduce((acc, lab) => { acc[lab.id] = true; return acc; }, {}),
        skills: { logic: 100, variables: 100, functions: 100, problemSolving: 100, consistency: 98 },
        latestCode: `if a<18 or s in "Ss":\n    print("20")\nelse:\n    print("50")`, feedbackFromTeacher: ''
    }
];

const CLASS_AVERAGE_SKILLS = { logic: 85, variables: 90, functions: 50, problemSolving: 78, consistency: 82 };

export default function App() {
    // --- AUTH STATES ---
    const [userRole, setUserRole] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [authError, setAuthError] = useState('');
    const [isSignUpMode, setIsSignUpMode] = useState(false);
    const [signupUsername, setSignupUsername] = useState('');

    // Teacher Security PIN State
    const [teacherPin, setTeacherPin] = useState('');
    const [isTeacherUnlocked, setIsTeacherUnlocked] = useState(false);

    // --- GENERAL APP STATES ---
    const [currentTab, setCurrentTab] = useState('dashboard');
    const [selectedLabIndex, setSelectedLabIndex] = useState(0);
    const [editorCode, setEditorCode] = useState(LESSON_LABS[0].template);
    const [terminalOutput, setTerminalOutput] = useState('');
    const [indentGuides, setIndentGuides] = useState(true);
    const [customApiKey, setCustomApiKey] = useState('');

    const [completedLabs, setCompletedLabs] = useState({});
    const [xp, setXp] = useState(0);
    const [badges, setBadges] = useState([]);

    const [traceSteps, setTraceSteps] = useState([]);
    const [currentTraceStepIndex, setCurrentTraceStepIndex] = useState(-1);
    const [isTracing, setIsTracing] = useState(false);

    const [aiResponse, setAiResponse] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [aiErrorMsg, setAiErrorMsg] = useState('');

    // --- TEACHER SQL INTEGRATION STATE ---
    const [studentList, setStudentList] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [teacherFeedbackInput, setTeacherFeedbackInput] = useState('');
    const [isTeacherDataLoading, setIsTeacherDataLoading] = useState(false);
    const [teacherDataError, setTeacherDataError] = useState('');

    // Initial Load Check
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

    // ดึงข้อมูลรายชื่อนักเรียนและคะแนนจริงจาก MySQL Database หลังบ้านเมื่อครูล็อกอินสำเร็จ
    useEffect(() => {
        if (userRole === 'teacher' && currentUser) {
            fetchTeacherData();
        }
    }, [userRole, currentUser]);

    // Update Visual Tracer when code changes
    useEffect(() => {
        generateVisualTrace(editorCode);
    }, [editorCode, selectedLabIndex]);

    const selectLab = (index) => {
        setSelectedLabIndex(index);
        setEditorCode(LESSON_LABS[index].template);
        setTerminalOutput('');
        setIsTracing(false);
        setCurrentTraceStepIndex(-1);
        setAiResponse('');
    };

    // ดึงข้อมูลนักเรียนแบบ Real-time จาก Express & MySQL DB
    const fetchTeacherData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setStudentList(MOCK_CLASS_STUDENTS);
            return;
        }

        setIsTeacherDataLoading(true);
        setTeacherDataError('');
        try {
            const response = await fetch('/api/teacher/students', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            const data = await response.json();
            if (data.success && data.students && data.students.length > 0) {
                setStudentList(data.students);
                setSelectedStudentId(data.students[0].id);
            } else if (data.error) {
                setTeacherDataError(data.error);
                // Fallback to mockup if API returns error but is technically "ok"
                if (studentList.length === 0) setStudentList(MOCK_CLASS_STUDENTS);
            }
        } catch (e) {
            console.warn("ไม่สามารถดึงข้อมูลจากฐานข้อมูลได้ (อาจเป็นเพราะสิทธิ์การใช้งานหรือเซิร์ฟเวอร์ไม่ได้รัน) ระบบจะใช้ข้อมูลจำลองแทนครับ", e);
            setStudentList(MOCK_CLASS_STUDENTS);
        } finally {
            setIsTeacherDataLoading(false);
        }
    };

    // --- LOGIN / REGISTRATION HANDLER ---
    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        if (!authEmail || !authPassword) return setAuthError('กรุณากรอกข้อมูลให้ครบถ้วน');
        if (isSignUpMode && !signupUsername) return setAuthError('กรุณากรอกชื่อผู้ใช้สำหรับการสมัครสมาชิก');

        setAuthLoading(true); setAuthError('');

        // ยิง API สมัครสมาชิกหรือล็อกอินหา Express + MySQL หลังบ้านจริง
        const targetUrl = isSignUpMode ? '/api/auth/signup' : '/api/auth/login';
        const payload = isSignUpMode
            ? { email: authEmail, password: authPassword, username: signupUsername, role: 'student' }
            : { email: authEmail, password: authPassword };

        try {
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

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

                // ดึงความคืบหน้าของเด็กจาก MySQL ถ้าล็อกอินเข้ามาแล้วมีโปรเกรสเดิมค้างอยู่
                if (result.user.role === 'student') {
                    // ดึงประวัติการทำด่านในกรณีที่มีการเก็บสถิติไว้ใน MySQL
                    const fetchProgress = async () => {
                        try {
                            const res = await fetch(`/api/labs/progress?userId=${result.user.id}`, {
                                headers: { 'Authorization': `Bearer ${result.token}` }
                            });
                            const prg = await res.json();
                            if (prg.success && prg.completedMap) {
                                setCompletedLabs(prg.completedMap);
                            }
                        } catch (e) {
                            setCompletedLabs({});
                        }
                    };
                    fetchProgress();
                }

                setCurrentTab(result.user.role === 'teacher' ? 'teacher' : result.user.role === 'parent' ? 'parent' : 'dashboard');
                setIsTeacherUnlocked(false); // Reset PIN Lock
            }
        } catch (err) {
            console.warn("เนื่องจากระบบรันแบบ standalone บนหน้าพรีวิว จึงบายพาสสิทธิ์การล็อกอินจำลองให้อัตโนมัติ", err);
            // Fallback สำหรับจำลองระบบพรีวิวหน้าบ้าน
            let role = isSignUpMode ? 'student' : (authEmail.includes('teacher') ? 'teacher' : authEmail.includes('parent') ? 'parent' : 'student');
            let user = {
                id: `mock-id-${Date.now()}`,
                email: authEmail,
                username: isSignUpMode ? signupUsername : (role === 'teacher' ? 'มานะ บากบั่น' : authEmail.split('@')[0]),
                role,
                xp: role === 'student' ? 0 : 0
            };

            setCurrentUser(user);
            setUserRole(user.role);
            setCurrentTab(role === 'teacher' ? 'teacher' : role === 'parent' ? 'parent' : 'dashboard');
            setIsTeacherUnlocked(false);

            if (isSignUpMode) {
                setCompletedLabs({});
                setXp(0);
                setBadges([]);
            } else if (role === 'student') {
                // เมื่อเข้าใช้งานครั้งแรก สถานะแล็บบทแรกควรจะต้องรันคอมไพล์ให้ผ่านถึงเปลี่ยนสถานะ (ไม่ใช่เซ็ต mockup ด่านแรกผ่านทันที)
                // ดังนั้น สำหรับนักเรียนใหม่ที่ล็อกอินครั้งแรก เราจะตั้งค่า completedLabs ให้เป็น Object เปล่าเพื่อรอทำข้อสอบ
                setCompletedLabs({});
                setXp(0);
            }
        } finally {
            setAuthLoading(false);
        }
    };

    const handleTeacherPinSubmit = (e) => {
        e.preventDefault();
        if (teacherPin === '328221') {
            setIsTeacherUnlocked(true);
            setTeacherPin('');
        } else {
            alert('รหัสความปลอดภัย (PIN) ไม่ถูกต้อง! (คำใบ้: 328221)');
            setTeacherPin('');
        }
    };

    const handleQuickDemoBypass = async (role) => {
        if (role === 'student') {
            alert('เพื่อประสิทธิภาพสูงสุดและการบันทึกคะแนนสะสม (XP) ของคุณลงในระบบฐานข้อมูลจริง กรุณา "สมัครสมาชิก" หรือ "เข้าสู่ระบบ" ก่อนเข้าเรียนนะครับ');
            return;
        }

        if (role === 'teacher') {
            try {
                // ยิง Login จริงสำหรับ Teacher Demo เพื่อให้ได้ JWT Token ไปคุยกับ MySQL หลังบ้าน
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: 'teacher@pycode.com', password: 'password123' })
                });
                const result = await response.json();
                if (response.ok && result.token) {
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('user', JSON.stringify(result.user));
                    setCurrentUser(result.user);
                    setUserRole('teacher');
                    setCurrentTab('teacher');
                    setIsTeacherUnlocked(false);
                    return;
                }
            } catch (e) {
                console.warn("Demo Login failed, fallback to mock", e);
            }
        }

        setUserRole(role);
        if (role === 'teacher') {
            setCurrentUser({ id: 'teacher-demo', email: 'teacher@pycode.com', username: 'มานะ บากบั่น', avatar: '👨‍🏫', role: 'teacher' });
            setCurrentTab('teacher');
            setIsTeacherUnlocked(false);
        } else if (role === 'parent') {
            setCurrentUser({ id: 'parent-demo', email: 'parent@pycode.com', username: 'ผู้ปกครองก้องเกียรติ', avatar: '👨‍👩‍👧‍👦', role: 'parent' });
            setCurrentTab('parent');
        } else {
            setCurrentUser({ id: 'student-demo', email: 'student@pycode.com', username: 'น้องก้องเกียรติ', avatar: '🧑‍💻', role: 'student' });
            setXp(2200);
            setCompletedLabs(MOCK_CLASS_STUDENTS[0].completedMap);
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
        setIsTeacherUnlocked(false);
        setCompletedLabs({});
        setXp(0);
        setBadges([]);
    };

    // --- TRACER ENGINE ---
    const generateVisualTrace = (code) => {
        const lines = code.split('\n');
        const steps = [];
        let vars = {};

        lines.forEach((line, index) => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;

            if (trimmed.includes('=') && !trimmed.includes('==') && !trimmed.includes('+=') && !trimmed.includes('-=') && !trimmed.startsWith('def') && !trimmed.startsWith('if') && !trimmed.startsWith('for') && !trimmed.startsWith('while')) {
                const parts = trimmed.split('=');
                const varName = parts[0].trim();
                vars[varName] = `จอง Memory เรียบร้อย`;
                steps.push({ lineIndex: index, text: line, vars: { ...vars }, comment: `ประกาศตัวแปร ${varName}` });
            } else if (trimmed.startsWith('for') || trimmed.startsWith('while')) {
                steps.push({ lineIndex: index, text: line, vars: { ...vars }, comment: 'เข้าสู่กระบวนการวนซ้ำ (Loop)' });
            } else if (trimmed.startsWith('if') || trimmed.startsWith('elif') || trimmed.startsWith('else')) {
                steps.push({ lineIndex: index, text: line, vars: { ...vars }, comment: 'ประเมินเงื่อนไขตรรกะ (Condition check)' });
            } else if (trimmed.startsWith('print')) {
                steps.push({ lineIndex: index, text: line, vars: { ...vars }, comment: 'สั่งแสดงผลออกทางคอนโซล' });
            } else if (trimmed.startsWith('def')) {
                steps.push({ lineIndex: index, text: line, vars: { ...vars }, comment: 'ประกาศสร้างฟังก์ชันใหม่' });
            } else if (trimmed.includes('return')) {
                steps.push({ lineIndex: index, text: line, vars: { ...vars }, comment: 'ส่งค่ากลับออกจากฟังก์ชัน (Return)' });
            } else {
                steps.push({ lineIndex: index, text: line, vars: { ...vars }, comment: 'ประมวลผลคำสั่ง...' });
            }
        });
        setTraceSteps(steps);
    };

    const handleNextStep = () => {
        if (traceSteps.length === 0) return;
        setIsTracing(true);
        if (currentTraceStepIndex < traceSteps.length - 1) {
            setCurrentTraceStepIndex(prev => prev + 1);
        } else {
            setIsTracing(false); setCurrentTraceStepIndex(-1);
        }
    };

    // --- AUTO GRADER (SMART KEYWORD CHECKER) ---
    const runCode = () => {
        const activeLab = LESSON_LABS[selectedLabIndex];
        setTerminalOutput('กำลังแปลภาษา (Interpreting) ทีละบรรทัด...\n');

        setTimeout(async () => {
            let output = '';
            let isCorrect = false;

            const required = activeLab.requiredKeywords || [];
            const hasAllKeywords = required.every(kw => editorCode.includes(kw));

            if (editorCode.trim() === activeLab.template.trim()) {
                output = "คุณยังไม่ได้แก้ไขโค้ดเลย ลองเขียนโค้ดตามโจทย์และคำใบ้ดูนะ!";
                isCorrect = false;
            }
            else if (hasAllKeywords) {
                output = (activeLab.testCases[0]?.expected || "รันโค้ดสำเร็จ!") + "\n\n>>> 🏆 ประสบความสำเร็จ! ผ่านการตรวจสอบความถูกต้อง";
                isCorrect = true;
            }
            else {
                output = "โค้ดยังไม่ถูกต้อง หรือขาดคำสั่งสำคัญบางอย่างไป\n\n>>> ❌ ล้มเหลว: " + activeLab.hint;
                isCorrect = false;
            }

            setTerminalOutput(output);

            if (isCorrect) {
                const wasCompleted = completedLabs[activeLab.id];
                setCompletedLabs(prev => ({ ...prev, [activeLab.id]: true }));
                if (!wasCompleted) {
                    const newXp = xp + 100;
                    setXp(newXp);
                    setBadges(prev => [...prev, 'Code Challenger']);

                    // ยิง API บันทึกความสำเร็จลง MySQL จริงผ่านหลังบ้าน
                    if (currentUser && currentUser.id !== 'student-demo') {
                        try {
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
                        } catch (e) {
                            console.error("ส่งข้อมูล API ล้มเหลว:", e);
                        }
                    }
                }
            }
        }, 800);
    };

    // --- PROGRESS CALCULATOR ---
    const calculateChapterProgress = (studentCompletedMap = {}) => {
        return CHAPTERS.map(chapter => {
            const labsInChapter = LESSON_LABS.filter(l => l.category === chapter);
            const total = labsInChapter.length;
            const passed = labsInChapter.filter(l => studentCompletedMap[l.id]).length;
            const percentage = total === 0 ? 0 : Math.round((passed / total) * 100);
            return { chapter, total, passed, percentage, labs: labsInChapter };
        });
    };

    // --- RENDER LOGIN SCREEN ---
    if (!userRole) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans text-slate-100 relative overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -z-10"></div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-teal-400 flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-purple-500/40 mb-6">
                    Py
                </div>
                <h1 className="text-3xl font-black text-white mb-6 text-center">เข้าสู่ระบบ PyCode LMS</h1>

                {/* AUTH FORM */}
                <div className="w-full max-w-md bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-2xl mb-6">
                    <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <span>🔑</span> {isSignUpMode ? 'สมัครบัญชีนักเรียนใหม่ (Student)' : 'เข้าสู่ระบบด้วยบัญชีผู้ใช้'}
                    </h2>

                    <form onSubmit={handleAuthSubmit} className="space-y-4">
                        {isSignUpMode && (
                            <div className="animate-fadeIn">
                                <label className="text-xs text-slate-400 block mb-1.5 font-semibold">ชื่อผู้ใช้ (Display Name):</label>
                                <input
                                    type="text"
                                    placeholder="เช่น น้องก้องเกียรติ สุดโก้"
                                    value={signupUsername}
                                    onChange={(e) => setSignupUsername(e.target.value)}
                                    className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 focus:outline-none focus:border-purple-500 text-slate-200 transition-all"
                                    required={isSignUpMode}
                                />
                            </div>
                        )}

                        <div>
                            <label className="text-xs text-slate-400 block mb-1.5 font-semibold">อีเมล (Email):</label>
                            <input
                                type="email"
                                placeholder={isSignUpMode ? "student@school.ac.th" : "เช่น teacher@pycode.com / student@pycode.com"}
                                value={authEmail}
                                onChange={(e) => setAuthEmail(e.target.value)}
                                className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 focus:outline-none focus:border-purple-500 text-slate-200 transition-all"
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
                                className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 focus:outline-none focus:border-purple-500 text-slate-200 transition-all"
                                required
                            />
                        </div>

                        {isSignUpMode && (
                            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl animate-fadeIn text-center">
                                <span className="text-xs text-purple-300 font-semibold">📌 ระบบเปิดให้สมัครเฉพาะบทบาท: นักเรียน (Student)</span>
                            </div>
                        )}

                        {authError && (
                            <p className="text-xs text-red-400 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20 animate-fadeIn">{authError}</p>
                        )}

                        <button type="submit" disabled={authLoading} className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-lg text-sm disabled:opacity-50">
                            {authLoading ? 'กำลังตรวจสอบ...' : (isSignUpMode ? '🚀 ลงทะเบียนสมัครบัญชีนักเรียน' : '🔑 เข้าสู่ระบบ')}
                        </button>
                    </form>

                    {/* Toggle Sign Up Mode */}
                    <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
                        <button onClick={() => { setIsSignUpMode(!isSignUpMode); setAuthError(''); }} className="text-xs text-purple-400 hover:text-purple-300 underline font-semibold transition-all">
                            {isSignUpMode ? 'มีบัญชีอยู่แล้วใช่ไหม? เข้าสู่ระบบที่นี่' : 'ยังไม่มีบัญชีนักเรียนใช่ไหม? สมัครสมาชิกที่นี่'}
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
                        <button onClick={() => handleQuickDemoBypass('student')} className="flex-1 bg-slate-900/60 border border-slate-800/60 hover:border-teal-500/40 p-4 rounded-xl flex items-center gap-3 transition-all">
                            <span className="text-3xl">👨‍💻</span>
                            <div className="text-left">
                                <span className="text-teal-400 font-bold text-xs block">นักเรียน (Student)</span>
                                <span className="text-[10px] text-slate-500">ดูแผนการเรียน 60 ด่าน</span>
                            </div>
                        </button>
                        <button onClick={() => handleQuickDemoBypass('teacher')} className="flex-1 bg-slate-900/60 border border-slate-800/60 hover:border-blue-500/40 p-4 rounded-xl flex items-center gap-3 transition-all">
                            <span className="text-3xl">👨‍🏫</span>
                            <div className="text-left">
                                <span className="text-blue-400 font-bold text-xs block">มานะ บากบั่น (Teacher)</span>
                                <span className="text-[10px] text-slate-500">ระบุรหัสผ่านเพื่อเข้าถึงข้อมูลนักเรียน</span>
                            </div>
                        </button>
                        <button onClick={() => handleQuickDemoBypass('parent')} className="flex-1 bg-slate-900/60 border border-slate-800/60 hover:border-pink-500/40 p-4 rounded-xl flex items-center gap-3 transition-all">
                            <span className="text-3xl">👨‍👩‍👧‍👦</span>
                            <div className="text-left">
                                <span className="text-pink-400 font-bold text-xs block">ผู้ปกครอง (Parent)</span>
                                <span className="text-[10px] text-slate-500">ดูทักษะเรดาร์เปรียบเทียบ</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col">
            {/* HEADER */}
            <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-teal-400 flex items-center justify-center text-xl font-black text-white shadow-lg">Py</div>
                        <div>
                            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">PyCode <span className="text-teal-400 text-base font-semibold">LMS</span></span>
                            <p className="text-xxs text-slate-500 leading-none">หลักสูตร Python M4 | จัดกลุ่มบทเรียน 60 ด่านสุดเข้มข้น</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {userRole === 'student' && (
                            <>
                                <div className="hidden sm:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 text-sm">
                                    <span className="text-amber-400 font-bold">🔥 {xp} XP</span>
                                </div>
                            </>
                        )}
                        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-800">
                            <span className={`text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1.5 ${userRole === 'teacher' ? 'bg-blue-500/20 text-blue-400' : userRole === 'parent' ? 'bg-pink-500/20 text-pink-400' : 'bg-teal-500/20 text-teal-400'}`}>
                                <span>{userRole === 'teacher' ? '👨‍🏫' : userRole === 'parent' ? '👨‍👩‍👧‍👦' : '👨‍💻'}</span>
                                {currentUser?.username || 'ผู้ใช้งาน'}
                            </span>
                            <button onClick={handleLogout} className="text-xs text-slate-500 hover:text-white underline">ออกจากระบบ</button>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 flex flex-col md:flex-row gap-6">
                {/* SIDEBAR NAVIGATION */}
                <aside className="w-full md:w-64 flex flex-row md:flex-col gap-2 shrink-0 overflow-x-auto pb-2 md:pb-0">
                    {userRole === 'student' && (
                        <>
                            <button onClick={() => setCurrentTab('dashboard')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'dashboard' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-900'}`}>📊 ภาพรวมระบบ</button>
                            <button onClick={() => { setCurrentTab('learning'); selectLab(0); }} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'learning' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-900'}`}>🗺️ แผนการเรียน 60 ด่าน</button>
                            <button onClick={() => setCurrentTab('editor')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'editor' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-900'}`}>💻 ห้องทดลองโค้ด</button>
                        </>
                    )}
                    {userRole === 'parent' && (
                        <button onClick={() => setCurrentTab('parent')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-pink-600 text-white">👨‍👩‍👧‍👦 รีพอร์ตผู้ปกครอง</button>
                    )}
                    {userRole === 'teacher' && (
                        <button onClick={() => setCurrentTab('teacher')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${currentTab === 'teacher' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>👨‍🏫 ระบบติดตามชั้นเรียน</button>
                    )}
                </aside>

                <section className="flex-1 min-w-0">

                    {/* STUDENT DASHBOARD */}
                    {userRole === 'student' && currentTab === 'dashboard' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-900/60 via-slate-900 to-indigo-950/60 border border-purple-500/20 shadow-xl relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10"></div>
                                <h1 className="text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">พัฒนาทักษะ Python สู่ความเป็นเลิศ! 🚀</h1>
                                <p className="text-slate-300 text-sm max-w-xl">ลุยแผนการเรียน 6 บทหลัก (60 ด่าน) จากระดับเริ่มต้น สู่การตะลุยโจทย์สนามสอบ TOI-Zero ตามหลักสูตร DIC M4</p>
                                <div className="mt-6 flex gap-3">
                                    <button onClick={() => { setCurrentTab('learning'); selectLab(0); }} className="px-5 py-2.5 bg-teal-400 text-slate-950 font-bold text-sm rounded-xl hover:bg-teal-300">ลุยแผนการเรียน {'->'}</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
                                    <div className="text-teal-400 text-3xl">🎯</div>
                                    <div><span className="text-xs text-slate-400 block font-medium">คะแนนรวมสะสม</span><span className="text-2xl font-black text-teal-400">{xp} XP</span></div>
                                </div>
                                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
                                    <div className="text-purple-400 text-3xl">🔥</div>
                                    <div><span className="text-xs text-slate-400 block font-medium">ทำแล็บสำเร็จแล้ว</span><span className="text-2xl font-black text-purple-400">{Object.values(completedLabs).filter(Boolean).length} / {LESSON_LABS.length} ด่าน</span></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STUDENT ROADMAP (GROUPED BY CHAPTER WITH SEQUENTIAL LOCK) */}
                    {userRole === 'student' && currentTab === 'learning' && (
                        <div className="space-y-8 animate-fadeIn">
                            <div>
                                <h2 className="text-2xl font-extrabold text-slate-100">🗺️ แผนการเรียนรู้ Python (60 ด่าน)</h2>
                                <p className="text-slate-400 text-sm mt-1">บทเรียนถูกจัดกลุ่มตามความยากง่าย คุณต้องทำด่านก่อนหน้าให้ผ่านก่อนเพื่อปลดล็อกด่านถัดไป!</p>
                            </div>

                            <div className="space-y-10">
                                {CHAPTERS.map((chapter, chapterIndex) => {
                                    const labsInChapter = LESSON_LABS.filter(l => l.category === chapter);
                                    if (labsInChapter.length === 0) return null;

                                    return (
                                        <div key={chapter} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                                            <h3 className="text-lg font-bold text-teal-300 mb-4 border-b border-slate-800 pb-2 flex justify-between items-center">
                                                {chapter}
                                                <span className="text-xs text-slate-500 font-normal bg-slate-950 px-3 py-1 rounded-full">
                                                    สำเร็จ {labsInChapter.filter(l => completedLabs[l.id]).length}/{labsInChapter.length}
                                                </span>
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {labsInChapter.map((lab) => {
                                                    const originalIndex = LESSON_LABS.findIndex(l => l.id === lab.id);
                                                    const isDone = completedLabs[lab.id];
                                                    const isUnlocked = originalIndex === 0 || completedLabs[LESSON_LABS[originalIndex - 1].id] || isDone;

                                                    return (
                                                        <div key={lab.id} className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${isDone ? 'bg-teal-950/20 border-teal-500/30' : isUnlocked ? 'bg-slate-900 border-purple-500/40 hover:border-purple-400 shadow-md' : 'bg-slate-950/60 border-slate-900 opacity-60 grayscale'}`}>
                                                            <div>
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <h4 className={`font-bold text-sm leading-snug ${isDone ? 'text-teal-400' : 'text-slate-200'}`}>
                                                                        {lab.title}
                                                                    </h4>
                                                                    {isDone ? <span className="text-teal-400 text-xs bg-teal-500/20 px-2 py-0.5 rounded">ผ่านแล้ว 🗸</span> : !isUnlocked && <span className="text-slate-600 text-xs">🔒 ล็อก</span>}
                                                                </div>
                                                                <p className="text-xs text-slate-400 line-clamp-2 mb-3">{lab.description}</p>
                                                            </div>

                                                            {isUnlocked ? (
                                                                <button onClick={() => { selectLab(originalIndex); setCurrentTab('editor'); }} className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${isDone ? 'bg-slate-800 text-teal-300 hover:bg-slate-700' : 'bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-600/20'}`}>
                                                                    {isDone ? 'ทบทวนโค้ด ↺' : 'ทำแล็บนี้ 🚀'}
                                                                </button>
                                                            ) : (
                                                                <div className="w-full py-2 rounded-lg text-xs text-center bg-slate-950 text-slate-600 font-semibold border border-slate-800">
                                                                    🔒 ต้องผ่านด่านก่อนหน้าก่อน
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* CODE EDITOR */}
                    {userRole === 'student' && currentTab === 'editor' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
                            <div className="lg:col-span-4 space-y-4">
                                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-semibold bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full">
                                            {LESSON_LABS[selectedLabIndex].category}
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-200">{LESSON_LABS[selectedLabIndex].title}</h2>

                                    {/* 📖 เนื้อหาความรู้ (Lesson Content) */}
                                    <div className="mt-4 p-4 bg-blue-950/20 border border-blue-500/30 rounded-xl">
                                        <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2 mb-2">
                                            <span>📖</span> เกร็ดความรู้ (Lesson)
                                        </h3>
                                        <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                                            {LESSON_LABS[selectedLabIndex].lessonContent}
                                        </p>
                                    </div>

                                    <div className="mt-4 p-3 bg-purple-950/30 rounded-xl border border-purple-500/10">
                                        <span className="text-xs text-purple-300 font-bold">👉 คำชี้แจงโจทย์:</span>
                                        <p className="text-xs text-slate-300 mt-1">{LESSON_LABS[selectedLabIndex].instruction}</p>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xl">🤖</span>
                                        <h3 className="font-bold text-slate-200 text-sm">AI Code Mentor</h3>
                                    </div>
                                    <button onClick={() => setAiResponse(`💡 คำใบ้: ${LESSON_LABS[selectedLabIndex].hint}`)} className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-md">
                                        💬 ขอคำใบ้จาก Mentor
                                    </button>
                                    {aiResponse && (
                                        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed border-l-2 border-l-indigo-500">
                                            {aiResponse}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="lg:col-span-8 space-y-4">
                                {/* Editor Block */}
                                <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col shadow-xl">
                                    <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-slate-800 flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <span className="w-3 h-3 rounded-full bg-rose-500"></span><span className="w-3 h-3 rounded-full bg-amber-500"></span><span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                            <span className="text-xs text-slate-400 ml-2 font-mono">main.py</span>
                                        </div>
                                        <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                                            <input type="checkbox" checked={indentGuides} onChange={() => setIndentGuides(!indentGuides)} className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0" />
                                            แสดงเส้นแบ่ง Indent
                                        </label>
                                    </div>
                                    <div className="relative flex min-h-[300px] font-mono text-sm leading-relaxed p-4 bg-slate-950">
                                        {indentGuides && (
                                            <div className="absolute inset-0 pointer-events-none opacity-20 flex">
                                                <div className="w-[52px] border-r border-slate-800"></div><div className="w-8 border-r border-purple-500"></div><div className="w-8 border-r border-teal-500"></div><div className="w-8 border-r border-pink-500"></div>
                                            </div>
                                        )}
                                        <textarea value={editorCode} onChange={(e) => setEditorCode(e.target.value)} spellCheck="false" className="flex-1 bg-transparent text-slate-100 focus:outline-none resize-none font-mono h-[300px] leading-6 z-10 whitespace-pre ml-8" />
                                    </div>
                                    <div className="bg-slate-900/60 px-4 py-3 flex gap-2 border-t border-slate-800">
                                        <button onClick={runCode} className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm flex-1">⚡ รันโค้ดและตรวจคำตอบ</button>
                                        <button onClick={handleNextStep} className="px-4 py-2 bg-indigo-950 text-indigo-300 font-semibold rounded-xl text-xs">⏱ Trace (จำลองทีละบรรทัด)</button>
                                    </div>
                                </div>

                                {/* Tracer Output */}
                                {(isTracing || currentTraceStepIndex !== -1) && (
                                    <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 shadow-xl">
                                        <h3 className="font-bold text-slate-200 text-sm mb-3">🧠 Visual Memory Tracer</h3>
                                        {currentTraceStepIndex !== -1 && traceSteps[currentTraceStepIndex] && (
                                            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                                                <span className="text-xxs text-indigo-400 block mb-1">กำลังทำงาน:</span>
                                                <code className="text-slate-200 bg-slate-950 p-2 block rounded border border-slate-800 font-mono text-xs">{traceSteps[currentTraceStepIndex].text}</code>
                                                <p className="text-xs text-teal-300 mt-2">💡 {traceSteps[currentTraceStepIndex].comment}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Terminal */}
                                <div className="rounded-2xl bg-slate-900 border border-slate-800">
                                    <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 text-xs text-slate-400 font-bold">📟 Console Output</div>
                                    <pre className="p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap min-h-[120px]">{terminalOutput}</pre>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PARENT REPORT TAB */}
                    {userRole === 'parent' && currentTab === 'parent' && (() => {
                        const radarData = [
                            { label: 'ตรรกะ (Logic)', value: completedLabs['b-04'] ? 95 : 45 },
                            { label: 'ตัวแปร (Variables)', value: completedLabs['v-05'] ? 85 : 50 },
                            { label: 'ฟังก์ชัน (Functions)', value: completedLabs['f-01'] ? 80 : 35 },
                            { label: 'แก้ปัญหา (Problem Solving)', value: xp > 100 ? 90 : 40 },
                            { label: 'ความพยายาม (Consistency)', value: Math.min(100, Object.values(completedLabs).filter(Boolean).length * 2) }
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
                            <div className="space-y-6">
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
                                                    <span className="text-sm font-bold text-pink-400">การคิดเป็นระบบ (Logic)</span>
                                                    <p className="text-xs text-slate-400 mt-1">ยอดเยี่ยม! น้องเข้าใจการวางเงื่อนไขและการจัดลำดับขั้น</p>
                                                </div>
                                                <div className="bg-slate-900 p-3 rounded-lg border-l-4 border-purple-500">
                                                    <span className="text-sm font-bold text-purple-400">การแก้ปัญหา (Problem Solving)</span>
                                                    <p className="text-xs text-slate-400 mt-1">ความกล้าที่จะลองผิดลองถูกทำให้เรียนรู้ได้ไวมาก</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* TEACHER ANALYTICS & PIN LOCK SCREEN */}
                    {userRole === 'teacher' && currentTab === 'teacher' && (() => {
                        // -- LOCK SCREEN LOGIC --
                        if (!isTeacherUnlocked) {
                            return (
                                <div className="flex flex-col items-center justify-center min-h-[500px] animate-fadeIn">
                                    <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full max-w-sm text-center relative overflow-hidden">
                                        <div className="absolute top-0 inset-x-0 h-2 bg-blue-500"></div>
                                        <span className="text-6xl mb-4 block">🔒</span>
                                        <h2 className="text-xl font-black text-slate-100 mb-2">Teacher Security PIN</h2>
                                        <p className="text-xs text-slate-400 mb-6">กรุณาระบุรหัสผ่านเพื่อเข้าถึงข้อมูลนักเรียน</p>

                                        <form onSubmit={handleTeacherPinSubmit} className="space-y-4">
                                            <input
                                                type="password"
                                                value={teacherPin}
                                                onChange={(e) => setTeacherPin(e.target.value)}
                                                placeholder="•••••"
                                                maxLength={6}
                                                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-blue-500 text-white"
                                                autoFocus
                                            />
                                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                                                ปลดล็อกระบบติดตาม
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            );
                        }

                        // -- TEACHER DASHBOARD LOGIC --
                        const activeStudent = studentList.find(s => s.id === selectedStudentId) || studentList[0];

                        if (!activeStudent) {
                            return (
                                <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-500">
                                    <span className="text-5xl mb-4">⌛</span>
                                    <p>กำลังเตรียมข้อมูลนักเรียน หรือไม่พบข้อมูลในระบบ...</p>
                                    <button onClick={fetchTeacherData} className="mt-4 text-sm text-blue-400 underline">ลองดึงข้อมูลอีกครั้ง</button>
                                </div>
                            );
                        }

                        const studentProgressByChapter = calculateChapterProgress(activeStudent.completedMap);

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
                                            <h2 className="text-2xl font-black text-blue-400">ระบบติดตามและประเมินทักษะของชั้นเรียน (Student Tracking)</h2>
                                            <p className="text-slate-400 text-sm">วิเคราะห์เจาะลึกนักเรียนรายบุคคลผ่าน 60 ด่าน เพื่อมอบหมายและให้คำปรึกษาได้อย่างตรงจุด</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsTeacherUnlocked(false)} className="text-xs text-slate-500 hover:text-rose-400 underline">ล็อกหน้าจอกลับไปใส่ PIN</button>
                                </div>

                                {isTeacherDataLoading && (
                                    <div className="text-center py-4 text-blue-400 font-bold animate-pulse">
                                        🔄 กำลังโหลดข้อมูลนักเรียนสดใหม่จากระบบฐานข้อมูล MySQL...
                                    </div>
                                )}

                                {teacherDataError && (
                                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-xs">
                                        ⚠️ เกิดข้อผิดพลาดในการโหลดข้อมูลจริง: {teacherDataError}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    {/* LEFT: STUDENT ROSTER */}
                                    <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                                        <span className="text-xs font-bold text-slate-200 block mb-2 px-1">🧑‍🎓 รายชื่อนักเรียน ({studentList.length} คน)</span>
                                        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                                            {studentList.map(student => {
                                                const isSelected = student.id === selectedStudentId;
                                                const doneCount = Object.values(student.completedMap || {}).filter(Boolean).length;
                                                return (
                                                    <div
                                                        key={student.id}
                                                        onClick={() => { setSelectedStudentId(student.id); setTeacherFeedbackInput(''); }}
                                                        className={`p-4 rounded-xl border cursor-pointer transition-all ${isSelected ? 'bg-blue-900/40 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-slate-950 border-slate-800/60 hover:bg-slate-900'}`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-3xl">{student.avatar || '🧑‍💻'}</span>
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-blue-300' : 'text-slate-200'}`}>{student.name}</h4>
                                                                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                                                    <div className="bg-teal-500 h-full" style={{ width: `${(doneCount / LESSON_LABS.length) * 100}%` }}></div>
                                                                </div>
                                                                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
                                                                    <span>{doneCount}/{LESSON_LABS.length} Labs</span>
                                                                    <span>{student.xp} XP</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* RIGHT: DEEP DIVE PROFILE */}
                                    <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-8">

                                        {/* Header profile */}
                                        <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
                                            <div className="w-16 h-16 bg-slate-800 rounded-2xl text-4xl flex items-center justify-center border border-slate-700">{activeStudent.avatar || '🧑‍💻'}</div>
                                            <div className="flex-1">
                                                <h3 className="font-black text-2xl text-slate-100">{activeStudent.name}</h3>
                                                <div className="flex gap-3 mt-1 text-xs font-semibold">
                                                    <span className="text-amber-400 bg-amber-400/10 px-2 py-1 rounded">คะแนนสะสม: {activeStudent.xp} XP</span>
                                                    <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">ความสม่ำเสมอ: {activeStudent.consistency}%</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Radar Chart */}
                                            <div className="flex flex-col items-center border border-slate-800 rounded-xl p-4 bg-slate-950">
                                                <span className="text-xxs text-pink-400 font-bold uppercase tracking-wider block mb-2">เปรียบเทียบทักษะรายบุคคล</span>
                                                <div className="relative w-[220px] h-[220px]">
                                                    <svg width={220} height={220} className="overflow-visible mx-auto">
                                                        {levels.map(level => (
                                                            <polygon key={level} points={angles.map(angle => getPoint(level * 100 * 0.7, angle)).join(' ')} fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                                                        ))}
                                                        {/* Class Avg */}
                                                        <polygon points={radarKeys.map((key, i) => getPoint(CLASS_AVERAGE_SKILLS[key.key] * 0.7, angles[i])).join(' ')} fill="none" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" strokeDasharray="2 2" />
                                                        {/* Student */}
                                                        {activeStudent && activeStudent.skills && (
                                                            <polygon points={radarKeys.map((key, i) => getPoint(activeStudent.skills[key.key] * 0.7, angles[i])).join(' ')} fill="rgba(236, 72, 153, 0.15)" stroke="#ec4899" strokeWidth="2" />
                                                        )}
                                                        {radarKeys.map((key, i) => {
                                                            const lx = center + (radius * 0.7 + 15) * Math.cos(angles[i]);
                                                            const ly = center + (radius * 0.7 + 10) * Math.sin(angles[i]);
                                                            return <text key={i} x={lx} y={ly} fill="#94a3b8" fontSize="8" textAnchor="middle" dominantBaseline="middle" className="font-semibold">{key.label}</text>;
                                                        })}
                                                    </svg>
                                                </div>
                                                <div className="mt-2 flex gap-3 text-xxs">
                                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-500/40"></span> เฉลี่ยห้อง</span>
                                                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-pink-500"></span> {activeStudent.name ? activeStudent.name.split(' ')[0] : 'นักเรียน'}</span>
                                                </div>
                                            </div>

                                            {/* Progress Bar by Chapter */}
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2"><span>📈</span> ความคืบหน้ารายบทเรียน</h4>
                                                <div className="space-y-4">
                                                    {studentProgressByChapter.map(prog => (
                                                        <div key={prog.chapter}>
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span className="text-slate-300 font-semibold truncate pr-2">{prog.chapter.split(':')[0]}</span>
                                                                <span className={prog.percentage === 100 ? 'text-teal-400 font-bold' : 'text-slate-500'}>{prog.passed}/{prog.total} ({prog.percentage}%)</span>
                                                            </div>
                                                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex border border-slate-700/50">
                                                                <div className={`h-full transition-all duration-1000 ${prog.percentage === 100 ? 'bg-teal-500' : prog.percentage > 0 ? 'bg-blue-500' : 'bg-transparent'}`} style={{ width: `${prog.percentage}%` }}></div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Detailed Lab Status Grid (60 Labs) */}
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-200 mb-3">📋 Status การส่งงานทั้งหมด (60 ด่าน)</h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
                                                {LESSON_LABS.map(lab => {
                                                    const isDone = activeStudent.completedMap?.[lab.id];
                                                    return (
                                                        <div key={lab.id} className={`p-2 rounded-lg border text-xs flex flex-col justify-center items-center text-center gap-1 ${isDone ? 'bg-teal-900/20 border-teal-500/30 text-teal-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                                                            <span className="truncate w-full font-medium" title={lab.title}>{lab.id}</span>
                                                            {isDone ? <span className="text-[10px] text-teal-400">✓ ผ่าน</span> : <span className="text-[10px] text-rose-400">รอส่ง</span>}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Live Code Review */}
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2"><span>⌨️</span> โค้ดที่ส่งล่าสุด</h4>
                                            <pre className="p-4 bg-[#0d1117] rounded-xl font-mono text-xs text-indigo-300 overflow-x-auto border border-slate-800 max-h-48 whitespace-pre">
                                                {activeStudent.latestCode || '# นักเรียนยังไม่ได้ส่งงานใดๆ ในระบบ'}
                                            </pre>
                                        </div>

                                        {/* Teacher Feedback Box */}
                                        <div className="bg-blue-950/20 p-5 rounded-xl border border-blue-500/20">
                                            <h4 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2"><span>✍️</span> บันทึกข้อเสนอแนะถึงนักเรียน (Feedback)</h4>
                                            {activeStudent.feedbackFromTeacher ? (
                                                <div className="p-3 bg-slate-950 border border-blue-500/30 text-sm text-slate-200 rounded-lg relative">
                                                    <p className="pr-12">{activeStudent.feedbackFromTeacher}</p>
                                                    <button
                                                        onClick={() => {
                                                            setStudentList(prev => prev.map(s => s.id === activeStudent.id ? { ...s, feedbackFromTeacher: '' } : s));
                                                        }}
                                                        className="absolute top-3 right-3 text-xs text-slate-500 hover:text-rose-400 underline"
                                                    >
                                                        แก้ไข
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="พิมพ์คำชื่นชม หรือแนะนำจุดที่น้องควรทบทวน..."
                                                        value={teacherFeedbackInput}
                                                        onChange={(e) => setTeacherFeedbackInput(e.target.value)}
                                                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg text-sm py-2.5 px-4 focus:outline-none focus:border-blue-500 text-slate-200"
                                                    />
                                                    <button
                                                        onClick={() => handleSendFeedback(activeStudent.id)}
                                                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 rounded-lg shadow-lg"
                                                    >
                                                        ส่งโน้ต
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
        </div>
    );
}