export const splitUsername = (string?: string | null) => {
    return string?.split("@")[0] ?? ""
}
