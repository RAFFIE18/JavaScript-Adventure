document.addEventListener('DOMContentLoaded', () => {
    const levelDescription = document.getElementById('level-description');
    const codeInput = document.getElementById('code-input');
    const runCodeButton = document.getElementById('run-code');
    const output = document.getElementById('output');
    const feedback = document.getElementById('feedback');

    const levels = [
        {
            description: 'Level 1: Buat variabel untuk menyimpan nama dan usia, dan cetak nilainya.',
            code: 'const name = "Raffie";\nconst age = 18;\nconsole.log("Nama:", name);\nconsole.log("Usia:", age);',
            expectedOutput: ['Nama: Alex', 'Usia: 20']
        },
        {
            description: 'Level 2: Hitung total poin yang diperoleh dari tiga tantangan.',
            code: 'const points1 = 50;\nconst points2 = 75;\nconst points3 = 30;\nconst totalPoints = points1 + points2 + points3;\nconsole.log("Total Poin:", totalPoints);',
            expectedOutput: ['Total Poin: 155']
        },
        {
            description: 'Level 3: Gunakan loop untuk mencetak item yang dikumpulkan.',
            code: 'const items = ["kunci", "peta", "obor", "potion"];\nconsole.log("Item yang dikumpulkan:");\nfor (let item of items) {\n    console.log(item);\n}\nconsole.log("\\nHitung mundur untuk memulai petualangan:");\nfor (let i = 5; i > 0; i--) {\n    console.log(i);\n}\nconsole.log("Mulai!");',
            expectedOutput: [
                'Item yang dikumpulkan:',
                'kunci',
                'peta',
                'obor',
                'potion',
                '',
                'Hitung mundur untuk memulai petualangan:',
                '5',
                '4',
                '3',
                '2',
                '1',
                'Mulai!'
            ]
        }
    ];

    let currentLevel = 0;

    const loadLevel = (level) => {
        levelDescription.textContent = level.description;
        codeInput.value = level.code;
        output.textContent = '';
        feedback.textContent = '';
    };

    const runCode = () => {
        const userCode = codeInput.value;
        output.textContent = ''; // Clear previous output

        try {
            // Redirect console.log to capture output
            const originalLog = console.log;
            console.log = function(message) {
                output.textContent += message + '\n';
            };

            eval(userCode);

            // Restore original console.log
            console.log = originalLog;

            const userOutput = output.textContent.trim().split('\n');
            const expectedOutput = levels[currentLevel].expectedOutput;

            if (compareOutput(userOutput, expectedOutput)) {
                feedback.textContent = 'Kamu berhasil! Semua variabel dan output benar.';
                currentLevel++;
                if (currentLevel < levels.length) {
                    loadLevel(levels[currentLevel]);
                } else {
                    feedback.textContent += ' Selamat, Anda telah menyelesaikan semua level!';
                }
            } else {
                feedback.textContent = `Coba lagi. Periksa kembali variabel dan output yang kamu buat.\n\nOutput Anda:\n${userOutput.join('\n')}\n\nOutput yang diharapkan:\n${expectedOutput.join('\n')}`;
            }
        } catch (error) {
            feedback.textContent = `Error: ${error.message}`;
        }
    };

    const compareOutput = (userOutput, expectedOutput) => {
        if (userOutput.length !== expectedOutput.length) {
            return false;
        }
        for (let i = 0; i < userOutput.length; i++) {
            if (userOutput[i].trim() !== expectedOutput[i].trim()) {
                return false;
            }
        }
        return true;
    };

    runCodeButton.addEventListener('click', runCode);

    loadLevel(levels[currentLevel]);
});
