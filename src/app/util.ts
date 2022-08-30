const RegExpSpecialChars = ".^$*+-?()[]{}|—/\\";

export const trim = (target: string, trimChar: string): string => {
    if (trimChar.length !== 1) {
        return target;
    }

    const regexp = RegExpSpecialChars.includes(trimChar)
        ? new RegExp(`^\\${trimChar}+|\\${trimChar}+$`, "g")
        : new RegExp(`^${trimChar}+|${trimChar}+$`, "g");

    return target.replace(regexp, "");
};
