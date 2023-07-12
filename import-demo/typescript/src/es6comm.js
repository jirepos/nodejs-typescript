import path from 'path'; 

// tsconfig.json 에 "moculde":"Node16"으로 설정해야 path를 사용할 수 있음 
export function getFileName() {
    return path.join('a', 'b', 'c ');
}