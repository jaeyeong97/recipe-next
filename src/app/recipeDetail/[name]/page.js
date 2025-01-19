"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchRecipeByName } from "@/app/api/recipeData";
import "./recipeDetail.css";


const RecipeDetail = () => {
    const { name } = useParams();
    const { data: recipe, isLoading, error } = useQuery({
        queryKey: ['recipe', name],
        queryFn: () => fetchRecipeByName(name),
    });

    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="recipe-detail">
            {isLoading ?
                <img className="recipe-detail__loading" src="/images/spinner.webp" alt="로딩" />
                :
                <div>
                    <div className="recipe__image-wrap">
                        {recipe[0].ATT_FILE_NO_MK && <img src={recipe[0].ATT_FILE_NO_MK} alt={recipe[0].RCP_NM} className="recipe-detail__image" />}
                    </div>
                    <div className="recipe-detail__main-text-wrap">
                        <h2 className="recipe-detail__title">
                            {recipe[0].RCP_NM}
                        </h2>
                        <p className="recipe-detail__tag">
                            #{recipe[0].RCP_PAT2}
                        </p>
                        <p className="recipe-detail__tag">
                            #{recipe[0].RCP_WAY2}
                        </p>
                        <img src="/images/favorite-detail-icon.svg" alt="좋아요 버튼" className="recipe-detail__favorite" />
                    </div>
                    <div className="recipe-detail__tip">
                        <div className="recipe-detail__tip-circle">
                            <img src="/images/logo.png" alt="로고" className="recipe-detail__tip-circle__image"></img>
                            <div className="recipe-detail__tip-title">
                                <span className="recipe-detail__tip-title-text">
                                    레시피 파인더
                                </span>
                                <span className="recipe-detail__tip-title-text">
                                    저감 조리법 tip
                                </span>
                            </div>
                        </div>
                        <div className="recipe-detail__tip-txt">
                            <span>{recipe[0].RCP_NA_TIP}</span>
                        </div>
                    </div>
                    <div className="recipe-detail__nutritions">
                        <div className="recipe-detail__second-title">영양성분</div>
                        <div className="recipe-detail__nutrition">
                            <div className="recipe-detail__nutrition-name">열량</div>
                            <div className="recipe-detail__nutrition-gram">{recipe[0].INFO_ENG}kcal</div>
                        </div>
                        <div className="recipe-detail__nutrition">
                            <div className="recipe-detail__nutrition-name">탄수화물</div>
                            <div className="recipe-detail__nutrition-gram">{recipe[0].INFO_CAR}g</div>
                        </div>
                        <div className="recipe-detail__nutrition">
                            <div className="recipe-detail__nutrition-name">단백질</div>
                            <div className="recipe-detail__nutrition-gram">{recipe[0].INFO_PRO}g</div>
                        </div>
                        <div className="recipe-detail__nutrition">
                            <div className="recipe-detail__nutrition-name">지방</div>
                            <div className="recipe-detail__nutrition-gram">{recipe[0].INFO_FAT}g</div>
                        </div>
                    </div>
                    <div className="recipe-detail__ingredients">
                        <div className="recipe-detail__second-title">재료</div>
                        <div className="recipe-detail__ingredient">
                            재료정보: {recipe[0].RCP_PARTS_DTLS}
                        </div>
                    </div>
                    <div className="recipe-detail__recipe">
                        <div className="recipe-detail__second-title">레시피</div>
                        {recipe[0].MANUAL_IMG01 && recipe[0].MANUAL01 &&
                            <div className="recipe-detail__step">
                                <img className="recipe-detail__step-image" src={recipe[0].MANUAL_IMG01} alt="조리법1" />
                                <div className="recipe-detail__step-text-wrap">
                                    <p className="recipe-detail__step-title">Step1</p>
                                    <p className="recipe-detail__step-text">
                                        {recipe[0].MANUAL01}
                                    </p>
                                </div>
                            </div>
                        }
                        {recipe[0].MANUAL_IMG02 && recipe[0].MANUAL02 &&
                            <div className="recipe-detail__step">
                                <img className="recipe-detail__step-image" src={recipe[0].MANUAL_IMG02} alt="조리법2" />
                                <div className="recipe-detail__step-text-wrap">
                                    <p className="recipe-detail__step-title">Step2</p>
                                    <p className="recipe-detail__step-text">
                                        {recipe[0].MANUAL02}
                                    </p>
                                </div>
                            </div>
                        }
                        {recipe[0].MANUAL_IMG03 && recipe[0].MANUAL03 &&
                            <div className="recipe-detail__step">
                                <img className="recipe-detail__step-image" src={recipe[0].MANUAL_IMG03} alt="조리법3" />
                                <div className="recipe-detail__step-text-wrap">
                                    <p className="recipe-detail__step-title">Step3</p>
                                    <p className="recipe-detail__step-text">
                                        {recipe[0].MANUAL03}
                                    </p>
                                </div>
                            </div>
                        }
                        {recipe[0].MANUAL_IMG04 && recipe[0].MANUAL04 &&
                            <div className="recipe-detail__step">
                                <img className="recipe-detail__step-image" src={recipe[0].MANUAL_IMG04} alt="조리법4" />
                                <div className="recipe-detail__step-text-wrap">
                                    <p className="recipe-detail__step-title">Step4</p>
                                    <p className="recipe-detail__step-text">
                                        {recipe[0].MANUAL04}
                                    </p>
                                </div>
                            </div>
                        }
                        {recipe[0].MANUAL_IMG05 && recipe[0].MANUAL05 &&
                            <div className="recipe-detail__step">
                                <img className="recipe-detail__step-image" src={recipe[0].MANUAL_IMG05} alt="조리법5" />
                                <div className="recipe-detail__step-text-wrap">
                                    <p className="recipe-detail__step-title">Step5</p>
                                    <p className="recipe-detail__step-text">
                                        {recipe[0].MANUAL05}
                                    </p>
                                </div>
                            </div>
                        }
                        {recipe[0].MANUAL_IMG06 && recipe[0].MANUAL06 &&
                            <div className="recipe-detail__step">
                                <img className="recipe-detail__step-image" src={recipe[0].MANUAL_IMG06} alt="조리법6" />
                                <div className="recipe-detail__step-text-wrap">
                                    <p className="recipe-detail__step-title">Step6</p>
                                    <p className="recipe-detail__step-text">
                                        {recipe[0].MANUAL06}
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }

        </div>
    );
};

export default RecipeDetail;
