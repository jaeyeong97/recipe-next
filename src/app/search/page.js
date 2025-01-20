'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchRecipes } from "../api/recipeData";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTyping, setSearchTyping] = useState("");

  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ["recipes", searchTerm],
    queryFn: () => fetchSearchRecipes(searchTerm),
    enabled: !!searchTerm,
  });

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(e.target.value);
    }
  };

  const handleSearch = () => {
    setSearchTerm(searchTyping);
  }

  const handleClear = () => {
    setSearchTyping("");
  };

  useEffect(() => {
    if (transcript) {
      setSearchTyping(transcript);
    }
  }, [transcript]);

  const handleStartSpeechRecognition = () => {
    SpeechRecognition.startListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>음성 인식을 지원하지 않거나 클라이언트 환경이 아닙니다.</p>;
  }

  return (
    <div className="search-page">
      <div className="search__input-wrap">
        <input
          className="search__input"
          type="text"
          placeholder="검색어를 입력해주세요."
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchTyping(e.target.value)}
          value={searchTyping}
        />
        {searchTyping &&
          <img
            className="search__close-icon"
            src="./images/close-icon.svg"
            alt="닫기 아이콘"
            onClick={handleClear}
          />}
        <img
          className="search__mic-icon"
          src="./images/mic-icon.svg"
          alt="음성 아이콘"
          onClick={handleStartSpeechRecognition}
        />
        <img
          className="search__search-icon"
          src="./images/search-icon-black.svg"
          alt="검색 아이콘"
          onClick={handleSearch}
        />
      </div>
      {recipes?.length > 0 ?
        <div className="search__length">
          {recipes.length}개의 레시피가 검색되었습니다.
        </div>
        :
        ""
      }

      {recipes?.length > 0 ? (
        <ul className="recipe__list">
          {recipes.map((recipe) => (
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
          }
        </ul>
      )
        : isLoading ? (
          <div className="search-loading">
            <img className="search-loading__image" src="./images/spinner.webp" alt="로딩" />
          </div>
        ) : error ? (
          <div>
            {error}: 에러가 발생하였습니다. 웹페이지를 새로 고침해주세요.
          </div>
        )
          :
          (
            !isLoading && searchTerm && <p className="search__no-results">검색 결과가 없습니다.</p>
          )
      }
    </div>
  )
}
export default Search;