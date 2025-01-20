import axios from "axios";

// 전체 레시피
export const fetchRecipes = async ({ pageParam = 1, recipeType = "" }) => {
    const start = 34 + (pageParam - 1) * 16;
    const end = 34 + pageParam * 16 - 1;
    const endpoint = `https://openapi.foodsafetykorea.go.kr/api/d94323bfaec344a59d3d/COOKRCP01/json/${start}/${end}`;
    const url = recipeType
        ? `${endpoint}/RCP_PAT2=${encodeURIComponent(recipeType)}`
        : endpoint;

    const response = await axios.get(url);

    return {
        data: response.data.COOKRCP01.row,
        nextPage: pageParam + 1,
        isLastPage: response.data.COOKRCP01.row.length < 16,
    };
};

// 상세 페이지 해당하는 레시피 한개
export const fetchRecipeByName = async (recipeName) => {
    const response = await axios.get(`https://openapi.foodsafetykorea.go.kr/api/d94323bfaec344a59d3d/COOKRCP01/json/1/1/RCP_NM=${recipeName}`);

    return response.data.COOKRCP01.row;
};

// 추천 레시피 4개
export const fetchRecommendedRecipe = async () => {
    const response = await axios.get(`https://openapi.foodsafetykorea.go.kr/api/d94323bfaec344a59d3d/COOKRCP01/json/1/4/RCP_PAT2=후식`);

    return response.data.COOKRCP01.row;
};

// 검색 페이지 레시피 요청
export const fetchSearchRecipes = async (searchTerm) => {
    if (!searchTerm) return [];
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const response = await axios.get(
        `https://openapi.foodsafetykorea.go.kr/api/d94323bfaec344a59d3d/COOKRCP01/json/1/999/RCP_NM=${encodedSearchTerm}`
    );

    return response.data.COOKRCP01?.row || [];
};