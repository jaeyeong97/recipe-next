import axios from "axios";

// 전체 레시피
export const fetchRecipes = async ({ pageParam = 1, recipeType = "" }) => {
    const start = 1 + (pageParam - 1) * 16;
    const end = pageParam * 16;
    const endpoint = `https://openapi.foodsafetykorea.go.kr/api/d94323bfaec344a59d3d/COOKRCP01/json/${start}/${end}`;
    const url = recipeType
        ? `${endpoint}/RCP_PAT2=${encodeURIComponent(recipeType)}`
        : endpoint;

    const response = await axios.get(url);
    console.log(response.data)
    return {
        data: response.data.COOKRCP01.row,
        nextPage: pageParam + 1,
        isLastPage: response.data.COOKRCP01.row.length < 16,
    };
};

// 상세 페이지 레시피
export const fetchRecipeByName = async (recipeName) => {
    const response = await axios.get(`https://openapi.foodsafetykorea.go.kr/api/d94323bfaec344a59d3d/COOKRCP01/json/1/1/RCP_NM=${recipeName}`);

    return response.data.COOKRCP01.row;
};

// 추천 레시피
export const fetchRecommendedRecipe = async () => {
    const response = await axios.get(`https://openapi.foodsafetykorea.go.kr/api/d94323bfaec344a59d3d/COOKRCP01/json/1/4/RCP_PAT2=후식`);

    return response.data.COOKRCP01.row;
};