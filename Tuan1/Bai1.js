function checkTypeScript(student) {
    if (student.isReady) {
        return "[Th\u00E0nh c\u00F4ng] ".concat(student.name, " (MSSV: ").concat(student.id, ") \u0111\u00E3 bi\u00EAn d\u1ECBch TypeScript th\u00E0nh c\u00F4ng!");
    }
    return "Chưa sẵn sàng.";
}
var user = {
    id: "23663521",
    name: "Nguyễn Trần Xuân Dũng",
    isReady: true
};
console.log(checkTypeScript(user));
