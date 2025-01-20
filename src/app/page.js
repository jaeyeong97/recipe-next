'use client';

import Link from "next/link";
import { fetchRecipes, fetchRecommendedRecipe } from "./api/recipeData";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import "./styles/home.css";

// 무한스크롤 API 호출
const useGetRecipes = (recipeType) => {
  return useInfiniteQuery({
    queryKey: ["recipes", recipeType],
    queryFn: ({ pageParam }) => fetchRecipes({ pageParam, recipeType }),
    getNextPageParam: (lastPage) =>
      lastPage.isLastPage ? undefined : lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export default function Home() {
  const [selectedType, setSelectedType] = useState(""); // 선택된 레시피 종류 상태 API 전달
  const [btnClicked, setBtnClicked] = useState(""); // 선택된 레시피 버튼 클래스명 추가

  const handleFilterChange = (type) => {
    setSelectedType(type);
    setBtnClicked(type);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = useGetRecipes(selectedType);
  const { ref, inView } = useInView();

  const { data: recommendedRecipes, isLoading: recommendedRecipeIsLoading } = useQuery({
    queryKey: ['recipe'],
    queryFn: fetchRecommendedRecipe,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (error) return <div>에러: {error.message}</div>;

  return (
    <main className="home">
      <div className="home__title-wrap">
        <div className="home__title-text1">
          RECIPES FOR YOU
        </div>
        <div className="home__title-text2">
          추천드리는 레시피를 둘러보세요.
        </div>
      </div>
      <div className="home__recommended-wrap">
        {recommendedRecipeIsLoading ?
          <div className="home_recommended-recipes">
            <div className="home_recommended-recipe home_recommended-recipe--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="home_recommended-recipe home_recommended-recipe--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="home_recommended-recipe home_recommended-recipe--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="home_recommended-recipe home_recommended-recipe--skeleton">
              <div className="skeleton-movement"></div>
            </div>
          </div>
          :
          <div className="home_recommended-recipes">
            {recommendedRecipes && recommendedRecipes.map((recommendedRecipe, index) => (
              <div className="home_recommended-recipe"
                key={recommendedRecipe.RCP_SEQ}>
                <Link href={`/recipeDetail/${recommendedRecipe.RCP_NM}`}>
                  <img
                    className="home_recommended-recipe-image"
                    src={recommendedRecipe.ATT_FILE_NO_MK}
                    alt={recommendedRecipe.RCP_NM}
                  />
                  <p className={`home_recommended-recipe-text ${index >= 1 && index <= 2 ? 'home_recommended-recipe-text--hidden' : ''}`}>
                    {recommendedRecipe.RCP_NM}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        }
      </div>
      <div className="home__title-wrap">
        <div className="home__title-text1">
          FIND YOUR RECIPES
        </div>
        <div className="home__title-text2">
          원하는 레시피를 찾아 맛있는 요리를 만들어 보세요.
        </div>
      </div>
      <div className="recipe__type-wrap">
        <div className="recipe__type_buttons">
          {["", "반찬", "일품", "밥", "국", "후식", "기타"].map((type) => (
            <button
              key={type}
              className={`recipe__type-button ${btnClicked === type ? "clicked" : ""}`}
              onClick={() => handleFilterChange(type)}
            >
              {type === "" ? "전체" : type === "국" ? "국&찌개" : type}
            </button>
          ))}
        </div>
      </div>
      {isLoading ?
        <ul className="recipe__list recipe__list--skeleton">
          <li className="recipe__item recipe__item--skeleton">
            <div className="recipe__image recipe__image--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__name recipe__name--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__tags recipe__tags--skeleton">
              <div className="skeleton-movement"></div>
            </div>
          </li>
          <li className="recipe__item recipe__item--skeleton">
            <div className="recipe__image recipe__image--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__name recipe__name--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__tags recipe__tags--skeleton">
              <div className="skeleton-movement"></div>
            </div>
          </li>
          <li className="recipe__item recipe__item--skeleton">
            <div className="recipe__image recipe__image--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__name recipe__name--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__tags recipe__tags--skeleton">
              <div className="skeleton-movement"></div>
            </div>
          </li>
          <li className="recipe__item recipe__item--skeleton">
            <div className="recipe__image recipe__image--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__name recipe__name--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__tags recipe__tags--skeleton">
              <div className="skeleton-movement"></div>
            </div>
          </li>
          <li className="recipe__item recipe__item--skeleton">
            <div className="recipe__image recipe__image--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__name recipe__name--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__tags recipe__tags--skeleton">
              <div className="skeleton-movement"></div>
            </div>
          </li>
          <li className="recipe__item recipe__item--skeleton">
            <div className="recipe__image recipe__image--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__name recipe__name--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__tags recipe__tags--skeleton">
              <div className="skeleton-movement"></div>
            </div>
          </li>
          <li className="recipe__item recipe__item--skeleton">
            <div className="recipe__image recipe__image--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__name recipe__name--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__tags recipe__tags--skeleton">
              <div className="skeleton-movement"></div>
            </div>
          </li>
          <li className="recipe__item recipe__item--skeleton">
            <div className="recipe__image recipe__image--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__name recipe__name--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__tags recipe__tags--skeleton">
              <div className="skeleton-movement"></div>
            </div>
          </li>
          <li className="recipe__item recipe__item--skeleton">
            <div className="recipe__image recipe__image--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__name recipe__name--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__tags recipe__tags--skeleton">
              <div className="skeleton-movement"></div>
            </div>
          </li>
          <li className="recipe__item recipe__item--skeleton">
            <div className="recipe__image recipe__image--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__name recipe__name--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__tags recipe__tags--skeleton">
              <div className="skeleton-movement"></div>
            </div>
          </li>
          <li className="recipe__item recipe__item--skeleton">
            <div className="recipe__image recipe__image--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__name recipe__name--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__tags recipe__tags--skeleton">
              <div className="skeleton-movement"></div>
            </div>
          </li>
          <li className="recipe__item recipe__item--skeleton">
            <div className="recipe__image recipe__image--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__name recipe__name--skeleton">
              <div className="skeleton-movement"></div>
            </div>
            <div className="recipe__tags recipe__tags--skeleton">
              <div className="skeleton-movement"></div>
            </div>
          </li>
        </ul>
        :
        <ul className="recipe__list">
          {data && data.pages.map((page) =>
            page.data.map((recipe) => (
              <li key={recipe.RCP_SEQ} className="recipe__item">
                <Link href={`/recipeDetail/${recipe.RCP_NM}`}>
                  {recipe.ATT_FILE_NO_MK && (
                    <img
                      src={recipe.ATT_FILE_NO_MK}
                      alt={recipe.RCP_NM}
                      className="recipe__image"
                    />
                  )}
                  <div className="recipe__info">
                    <span className="recipe__name">{recipe.RCP_NM}</span>
                    <div className="recipe__tags">
                      <span className="recipe__tag">#{recipe.RCP_WAY2}</span>
                      <span className="recipe__tag">#{recipe.RCP_PAT2}</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      }
      <div className="home__ref-bottom" ref={ref}></div>
      {isFetchingNextPage && <img className="loading" src="/images/spinner.webp" alt="로딩" />}
    </main>
  );
}
